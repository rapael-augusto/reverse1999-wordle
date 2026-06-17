from pydantic import BaseModel

class SlugInput(BaseModel):
    slug: str