import hashlib
from datetime import datetime


def get_hash_string(string: str) -> str:
    """This handler returns the hashed string

    Args:
        string: str. The string that needs to be hashed

    Returns:
        str. Hashed string is returned
    """
    return hashlib.sha256(string.encode()).hexdigest()


def get_current_iso_datetime():
    return datetime.utcnow().isoformat()
