#!/usr/bin/env node

const { S3Client, HeadBucketCommand, PutObjectCommand } = require('@aws-sdk/client-s3');

// Load environment variables manually
const fs = require('fs');
if (fs.existsSync('./deployment-secrets.env')) {
    const envContent = fs.readFileSync('./deployment-secrets.env', 'utf8');
    envContent.split('\n').forEach(line => {
        if (line.includes('=') && !line.startsWith('#')) {
            const [key, ...valueParts] = line.split('=');
            process.env[key.trim()] = valueParts.join('=').trim();
        }
    });
}

async function testS3Connection() {
    console.log('Testing DigitalOcean Spaces Connection...');
    console.log('=========================================');
    
    // Configuration from environment
    const config = {
        region: process.env.S3_REGION || 'fra1',
        bucket: process.env.S3_BUCKET || 'mediaboxstuff',
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        endpoint: process.env.S3_ENDPOINT || 'https://fra1.digitaloceanspaces.com',
        prefix: process.env.S3_PREFIX || 'Medusa-Webstore'
    };
    
    console.log('Configuration:');
    console.log(`- Region: ${config.region}`);
    console.log(`- Bucket: ${config.bucket}`);
    console.log(`- Endpoint: ${config.endpoint}`);
    console.log(`- Access Key: ${config.accessKeyId ? config.accessKeyId.substring(0, 8) + '...' : 'NOT SET'}`);
    console.log(`- Secret Key: ${config.secretAccessKey ? '***' : 'NOT SET'}`);
    console.log(`- Prefix: ${config.prefix}`);
    console.log('');
    
    if (!config.accessKeyId || !config.secretAccessKey) {
        console.error('❌ Error: S3_ACCESS_KEY_ID or S3_SECRET_ACCESS_KEY not set');
        process.exit(1);
    }
    
    // Create S3 client
    const s3Client = new S3Client({
        region: 'us-east-1', // DigitalOcean Spaces often requires us-east-1 for SDK compatibility
        endpoint: config.endpoint,
        credentials: {
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
        },
        forcePathStyle: false // DigitalOcean Spaces uses virtual-hosted-style
    });
    
    try {
        // Test 1: Check if bucket exists and is accessible
        console.log('Test 1: Checking bucket access...');
        await s3Client.send(new HeadBucketCommand({ Bucket: config.bucket }));
        console.log('✅ Bucket access successful');
        
        // Test 2: Try to upload a test file
        console.log('Test 2: Testing file upload...');
        const testKey = `${config.prefix}/test-upload-${Date.now()}.txt`;
        const testContent = 'Test upload from Medusa server';
        
        await s3Client.send(new PutObjectCommand({
            Bucket: config.bucket,
            Key: testKey,
            Body: testContent,
            ContentType: 'text/plain'
        }));
        
        console.log('✅ File upload successful');
        console.log(`   Uploaded to: ${testKey}`);
        console.log(`   File URL: https://${config.bucket}.${config.region}.digitaloceanspaces.com/${testKey}`);
        
        console.log('');
        console.log('🎉 S3 connection test PASSED!');
        console.log('Your DigitalOcean Spaces configuration is working correctly.');
        
    } catch (error) {
        console.log('');
        console.log('❌ S3 connection test FAILED!');
        console.error('Error details:', error.message);
        
        if (error.name === 'CredentialsProviderError') {
            console.log('💡 This suggests your access credentials are invalid or expired.');
        } else if (error.name === 'NoSuchBucket') {
            console.log('💡 The bucket does not exist or you don\'t have access to it.');
        } else if (error.name === 'AccessDenied') {
            console.log('💡 Access denied - check your credentials and bucket permissions.');
        } else if (error.name === 'NetworkingError' || error.message.includes('ENOTFOUND')) {
            console.log('💡 Network error - check your endpoint URL and internet connection.');
        }
        
        console.log('');
        console.log('Troubleshooting steps:');
        console.log('1. Verify your DigitalOcean Spaces access key and secret key');
        console.log('2. Check that the bucket "mediaboxstuff" exists in the fra1 region');
        console.log('3. Verify the access key has read/write permissions for the bucket');
        console.log('4. Test the endpoint URL in your browser or with curl');
        
        process.exit(1);
    }
}

testS3Connection();