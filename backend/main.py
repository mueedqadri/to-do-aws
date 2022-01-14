from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import auth, tasks

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(tasks.router)


@app.get("/health_check")
async def health_check():
    return {"message": "Server is running fine"}

