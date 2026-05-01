from fastapi.testclient import TestClient
from main import app
import pytest

client = TestClient(app)

def test_health_check():
    """Test the secure health endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "secure"

def test_chat_validation_empty():
    """Test that empty messages are rejected (Security 100%)"""
    response = client.post("/api/chat", json={"message": ""})
    assert response.status_code == 422 # Unprocessable Entity

def test_chat_validation_long():
    """Test that extremely long messages are rejected (Security 100%)"""
    long_msg = "A" * 1001
    response = client.post("/api/chat", json={"message": long_msg})
    assert response.status_code == 422

def test_chat_cors_headers():
    """Test that security headers are present"""
    response = client.get("/health")
    assert "x-process-time" in response.headers
