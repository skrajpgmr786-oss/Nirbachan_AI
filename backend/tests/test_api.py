import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    """Verify backend operational status"""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "operational"

def test_chat_endpoint_valid():
    """Verify chat endpoint processing"""
    payload = {"message": "What is the minimum voting age in India?"}
    response = client.post("/api/chat", json=payload)
    # Note: This might return 503 if API key is not in test env, but we test the structure
    assert response.status_code in [200, 503]
    if response.status_code == 200:
        assert "reply" in response.json()

def test_chat_endpoint_empty():
    """Verify error handling for empty messages"""
    payload = {"message": "   "}
    response = client.post("/api/chat", json=payload)
    assert response.status_code == 400

def test_cors_headers():
    """Verify security headers are present"""
    response = client.options("/api/chat")
    assert "access-control-allow-origin" in response.headers
