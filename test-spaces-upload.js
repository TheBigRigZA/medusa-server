#!/usr/bin/env node

const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const crypto = require('crypto');

// Load environment variables
if (fs.existsSync('./deployment-secrets.env')) {
    const envContent = fs.readFileSync('./deployment-secrets.env', 'utf8');
    envContent.split('\n').forEach(line => {
        if (line.includes('=') && !line.startsWith('#')) {
            const [key, ...valueParts] = line.split('=');
            process.env[key.trim()] = valueParts.join('=').trim();
        }
    });
}

async function testSpacesUpload() {
    console.log('Testing DigitalOcean Spaces Upload (Following DO Documentation)...');
    console.log('=========================================================');
    
    // Configuration according to DigitalOcean documentation
    const config = {
        endpoint: "https://fra1.digitaloceanspaces.com",
        region: "us-east-1", // MUST be us-east-1 for DO Spaces
        bucket: "mediaboxstuff",
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        prefix: process.env.S3_PREFIX || "Medusa-Webstore"
    };
    
    console.log('Configuration:');
    console.log(`- Endpoint: ${config.endpoint}`);
    console.log(`- Region: ${config.region} (required by DO Spaces)`);
    console.log(`- Bucket: ${config.bucket}`);
    console.log(`- Access Key: ${config.accessKeyId ? config.accessKeyId.substring(0, 8) + '...' : 'NOT SET'}`);
    console.log(`- Prefix: ${config.prefix}`);
    console.log('');
    
    if (!config.accessKeyId || !config.secretAccessKey) {
        console.error('❌ Error: S3_ACCESS_KEY_ID or S3_SECRET_ACCESS_KEY not set');
        process.exit(1);
    }
    
    // Create S3 client following DO documentation
    const s3Client = new S3Client({
        forcePathStyle: false, // DO Spaces uses subdomain/virtual calling format
        endpoint: config.endpoint,
        region: config.region,
        credentials: {
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
        }
    });
    
    try {
        // Create a test file
        const testFileName = `test-${Date.now()}.txt`;
        const testKey = `${config.prefix}/${testFileName}`;
        const testContent = Buffer.from('Test upload from Medusa server - ' + new Date().toISOString());
        
        console.log('Uploading test file...');
        console.log(`- File name: ${testFileName}`);
        console.log(`- Full key: ${testKey}`);
        
        // Upload the file
        const uploadCommand = new PutObjectCommand({
            Bucket: config.bucket,
            Key: testKey,
            Body: testContent,
            ContentType: 'text/plain',
            ACL: 'public-read' // Make it publicly accessible for testing
        });
        
        await s3Client.send(uploadCommand);
        
        console.log('✅ Upload successful!');
        
        // Construct the public URL
        const publicUrl = `https://${config.bucket}.fra1.digitaloceanspaces.com/${testKey}`;
        console.log(`\nPublic URL: ${publicUrl}`);
        
        // Try to retrieve the file
        console.log('\nVerifying upload by retrieving the file...');
        const getCommand = new GetObjectCommand({
            Bucket: config.bucket,
            Key: testKey
        });
        
        const response = await s3Client.send(getCommand);
        const retrievedContent = await streamToString(response.Body);
        
        if (retrievedContent === testContent.toString()) {
            console.log('✅ File content verified successfully!');
        } else {
            console.log('⚠️  File retrieved but content mismatch');
        }
        
        console.log('\n🎉 DigitalOcean Spaces is working correctly!');
        console.log('\nNext steps:');
        console.log('1. Update medusa-config.ts to use these exact settings');
        console.log('2. Ensure ENABLE_S3=true is set');
        console.log('3. Test image upload in the admin panel');
        
    } catch (error) {
        console.error('\n❌ Upload test FAILED!');
        console.error('Error:', error.name);
        console.error('Message:', error.message);
        
        if (error.$metadata) {
            console.error('HTTP Status:', error.$metadata.httpStatusCode);
            console.error('Request ID:', error.$metadata.requestId);
        }
        
        console.log('\nTroubleshooting:');
        console.log('1. Verify your access keys are correct');
        console.log('2. Check that the bucket exists and is in fra1 region');
        console.log('3. Ensure the access key has write permissions');
        
        process.exit(1);
    }
}

// Helper function to convert stream to string
async function streamToString(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString('utf-8');
}

// Test with curl command
function generateCurlTest() {
    console.log('\n\nCURL Test Command:');
    console.log('==================');
    console.log('You can also test with curl:');
    
    const date = new Date().toUTCString();
    const bucket = 'mediaboxstuff';
    const key = 'Medusa-Webstore/test-curl.txt';
    const contentType = 'text/plain';
    const method = 'PUT';
    
    console.log(`
curl -X PUT \\
  https://${bucket}.fra1.digitaloceanspaces.com/${key} \\
  -H "Content-Type: ${contentType}" \\
  -H "x-amz-acl: public-read" \\
  -H "Date: ${date}" \\
  -d "Test from curl"
`);
    console.log('\nNote: This curl command requires proper AWS signature which is complex to generate manually.');
    console.log('The Node.js test above is more reliable for testing.');
}

testSpacesUpload().then(() => {
    generateCurlTest();
});