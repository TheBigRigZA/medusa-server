#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function diagnoseUploadError() {
    console.log('Medusa Upload Error Diagnosis');
    console.log('=============================');
    console.log('');
    
    // Load environment variables
    let envVars = {};
    try {
        const envContent = fs.readFileSync('./deployment-secrets.env', 'utf8');
        envContent.split('\n').forEach(line => {
            if (line.includes('=') && !line.startsWith('#')) {
                const [key, ...valueParts] = line.split('=');
                envVars[key.trim()] = valueParts.join('=').trim();
            }
        });
    } catch (error) {
        console.log('⚠️  Could not read deployment-secrets.env');
    }
    
    // 1. Check environment configuration
    console.log('1. Environment Configuration Check');
    console.log('----------------------------------');
    
    const requiredVars = [
        'ENABLE_S3',
        'S3_REGION', 
        'S3_BUCKET',
        'S3_ACCESS_KEY_ID',
        'S3_SECRET_ACCESS_KEY',
        'S3_ENDPOINT',
        'S3_FILE_URL'
    ];
    
    let configErrors = [];
    
    requiredVars.forEach(varName => {
        if (envVars[varName]) {
            if (varName === 'S3_SECRET_ACCESS_KEY') {
                console.log(`✅ ${varName}=***hidden***`);
            } else {
                console.log(`✅ ${varName}=${envVars[varName]}`);
            }
        } else {
            console.log(`❌ ${varName}=NOT SET`);
            configErrors.push(varName);
        }
    });
    
    if (envVars['ENABLE_S3'] !== 'true') {
        console.log('❌ CRITICAL: ENABLE_S3 is not set to "true"');
        configErrors.push('ENABLE_S3 must be "true"');
    }
    
    console.log('');
    
    // 2. Check Medusa configuration file
    console.log('2. Medusa Configuration Check');
    console.log('-----------------------------');
    
    try {
        const configContent = fs.readFileSync('./medusa-config.ts', 'utf8');
        
        if (configContent.includes('process.env.ENABLE_S3 === "true"')) {
            console.log('✅ Conditional S3 loading found in medusa-config.ts');
        } else {
            console.log('❌ Conditional S3 loading not found');
        }
        
        if (configContent.includes('@medusajs/medusa/file-s3')) {
            console.log('✅ S3 file provider configured');
        } else {
            console.log('❌ S3 file provider not found in config');
        }
        
        // Check for proper field names
        const fieldChecks = [
            { field: 'file_url', found: configContent.includes('file_url') },
            { field: 'access_key_id', found: configContent.includes('access_key_id') },
            { field: 'secret_access_key', found: configContent.includes('secret_access_key') },
            { field: 'region', found: configContent.includes('region') },
            { field: 'bucket', found: configContent.includes('bucket') },
            { field: 'endpoint', found: configContent.includes('endpoint') }
        ];
        
        fieldChecks.forEach(check => {
            if (check.found) {
                console.log(`✅ Field '${check.field}' configured`);
            } else {
                console.log(`❌ Field '${check.field}' missing`);
                configErrors.push(`Missing field: ${check.field}`);
            }
        });
        
    } catch (error) {
        console.log('❌ Could not read medusa-config.ts');
        configErrors.push('Cannot read medusa-config.ts');
    }
    
    console.log('');
    
    // 3. Check file service module
    console.log('3. File Service Module Check');
    console.log('----------------------------');
    
    const s3ModulePath = './node_modules/@medusajs/file-s3';
    if (fs.existsSync(s3ModulePath)) {
        console.log('✅ @medusajs/file-s3 module installed');
        
        const packagePath = path.join(s3ModulePath, 'package.json');
        try {
            const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            console.log(`✅ Module version: ${packageJson.version}`);
        } catch (error) {
            console.log('⚠️  Could not read module version');
        }
    } else {
        console.log('❌ @medusajs/file-s3 module not found');
        configErrors.push('@medusajs/file-s3 module missing');
    }
    
    console.log('');
    
    // 4. Check potential file upload configuration issues
    console.log('4. Upload Configuration Analysis');
    console.log('--------------------------------');
    
    // Check if file_url matches expected format
    const fileUrl = envVars['S3_FILE_URL'];
    const bucket = envVars['S3_BUCKET'];
    const region = envVars['S3_REGION'];
    
    if (fileUrl && bucket && region) {
        const expectedUrl = `https://${bucket}.${region}.digitaloceanspaces.com`;
        if (fileUrl === expectedUrl) {
            console.log('✅ S3_FILE_URL format is correct');
        } else {
            console.log(`⚠️  S3_FILE_URL might be incorrect:`);
            console.log(`   Current: ${fileUrl}`);
            console.log(`   Expected: ${expectedUrl}`);
        }
    }
    
    // Check endpoint format
    const endpoint = envVars['S3_ENDPOINT'];
    if (endpoint && region) {
        const expectedEndpoint = `https://${region}.digitaloceanspaces.com`;
        if (endpoint === expectedEndpoint) {
            console.log('✅ S3_ENDPOINT format is correct');
        } else {
            console.log(`⚠️  S3_ENDPOINT might be incorrect:`);
            console.log(`   Current: ${endpoint}`);
            console.log(`   Expected: ${expectedEndpoint}`);
        }
    }
    
    console.log('');
    
    // 5. Summary and recommendations
    console.log('5. Diagnosis Summary');
    console.log('-------------------');
    
    if (configErrors.length === 0) {
        console.log('🎉 No configuration errors detected!');
        console.log('');
        console.log('If you\'re still experiencing "field image 0 error", try:');
        console.log('1. Restart your Medusa server to reload configuration');
        console.log('2. Clear browser cache and refresh admin panel');
        console.log('3. Test S3 connection: node test-s3-connection.js');
        console.log('4. Check server logs for detailed error messages');
        console.log('5. Verify DigitalOcean Spaces bucket permissions');
    } else {
        console.log('❌ Configuration issues found:');
        configErrors.forEach((error, index) => {
            console.log(`   ${index + 1}. ${error}`);
        });
        console.log('');
        console.log('🔧 To fix these issues:');
        console.log('1. Run: ./fix-s3-config.sh');
        console.log('2. Update environment variables with: ./set-env-vars.sh');
        console.log('3. Restart your application');
        console.log('4. Test with: node test-s3-connection.js');
    }
    
    console.log('');
    console.log('Additional debugging:');
    console.log('- Check server logs for specific error details');
    console.log('- Verify DigitalOcean Spaces access key permissions');
    console.log('- Test file upload with a small image file');
    console.log('- Ensure CORS is properly configured for your admin domain');
}

diagnoseUploadError();