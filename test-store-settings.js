#!/usr/bin/env node

const baseUrl = 'https://shop.mediabox.co';

async function testStoreSettings() {
    console.log('Testing Store Settings API Endpoints');
    console.log('====================================');
    
    // Test 1: Check if store settings endpoint exists
    console.log('\n1. Testing store settings endpoint accessibility...');
    try {
        const response = await fetch(`${baseUrl}/store/settings`);
        console.log(`   Status: ${response.status}`);
        
        if (response.status === 401) {
            console.log('   ✅ Endpoint exists but requires publishable API key (expected)');
        } else if (response.status === 404) {
            console.log('   ❌ Endpoint not found - module may not be loaded');
        } else {
            const data = await response.text();
            console.log(`   Response: ${data}`);
        }
    } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
    }
    
    // Test 2: Check admin settings endpoint
    console.log('\n2. Testing admin settings endpoint...');
    try {
        const response = await fetch(`${baseUrl}/admin/settings/store`);
        console.log(`   Status: ${response.status}`);
        
        if (response.status === 401) {
            console.log('   ✅ Endpoint exists but requires authentication (expected)');
        } else if (response.status === 404) {
            console.log('   ❌ Endpoint not found - API route may not be loaded');
        } else {
            const data = await response.text();
            console.log(`   Response: ${data}`);
        }
    } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
    }
    
    // Test 3: Check if the module is loaded by testing health endpoint
    console.log('\n3. Testing server health...');
    try {
        const response = await fetch(`${baseUrl}/health`);
        console.log(`   Status: ${response.status}`);
        
        if (response.status === 200) {
            console.log('   ✅ Server is running');
        }
    } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
    }
    
    console.log('\n📋 Next Steps:');
    console.log('1. Create a publishable API key in the admin panel');
    console.log('2. Test the store endpoint with: curl -H "x-publishable-api-key: YOUR_KEY" https://shop.mediabox.co/store/settings');
    console.log('3. Create an admin user and test the admin endpoint');
    console.log('4. Use the settings API in your frontend to control shop visibility');
}

testStoreSettings();