from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_list_assignments():
    response = client.get("/list")
    assert response.status_code == 200