#!/bin/bash

# Notification Endpoint Verification Script
# This script tests the /api/notifications endpoint to verify the 403 error is fixed

echo "=========================================="
echo "Notification Endpoint Verification Script"
echo "=========================================="
echo ""

# Check if backend is running
echo "1. Checking if backend server is running on port 8080..."
if curl -s http://localhost:8080/actuator/health > /dev/null 2>&1 || curl -s http://localhost:8080/ > /dev/null 2>&1; then
    echo "   ✓ Backend server is running"
else
    echo "   ✗ Backend server is not running on port 8080"
    echo "   Please start the backend with: cd backend && mvn spring-boot:run"
    exit 1
fi

echo ""
echo "2. Testing /api/notifications endpoint..."
echo ""

# Test the notifications endpoint
response=$(curl -s -w "\nHTTP_CODE:%{http_code}" http://localhost:8080/api/notifications)
http_code=$(echo "$response" | grep "HTTP_CODE:" | cut -d':' -f2)
body=$(echo "$response" | grep -v "HTTP_CODE:")

echo "   HTTP Status Code: $http_code"
echo ""

if [ "$http_code" = "200" ]; then
    echo "   ✓ SUCCESS! Endpoint is accessible (HTTP 200)"
    echo "   ✓ The 403 Forbidden error has been fixed!"
    echo ""
    echo "   Response body:"
    echo "$body" | python3 -m json.tool 2>/dev/null || echo "$body"
    echo ""
    echo "=========================================="
    echo "VERIFICATION PASSED ✓"
    echo "=========================================="
    exit 0
    
elif [ "$http_code" = "403" ]; then
    echo "   ✗ FAILED! Still getting 403 Forbidden"
    echo "   The security configuration may not have been applied correctly."
    echo ""
    echo "   Please check:"
    echo "   1. SecurityConfig.java has '/api/notifications' in permitAll()"
    echo "   2. Backend has been rebuilt and restarted"
    echo ""
    echo "=========================================="
    echo "VERIFICATION FAILED ✗"
    echo "=========================================="
    exit 1
    
elif [ "$http_code" = "500" ]; then
    echo "   ⚠ Server Error (HTTP 500)"
    echo "   The endpoint is accessible but there's a server-side error."
    echo "   This is likely a database connection issue."
    echo ""
    echo "   Please check:"
    echo "   1. Neon database credentials in application.properties"
    echo "   2. Database connection and network access"
    echo "   3. Backend logs for detailed error messages"
    echo ""
    echo "   Response body:"
    echo "$body"
    echo ""
    echo "=========================================="
    echo "VERIFICATION PARTIAL ⚠"
    echo "Security fix applied, but database issue detected"
    echo "=========================================="
    exit 2
    
else
    echo "   ⚠ Unexpected HTTP Status: $http_code"
    echo ""
    echo "   Response body:"
    echo "$body"
    echo ""
    echo "=========================================="
    echo "VERIFICATION INCONCLUSIVE"
    echo "=========================================="
    exit 3
fi
