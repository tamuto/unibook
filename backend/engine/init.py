from ..utils import config
import os
from .depends import get_current_user_id


def get_init(sub: dict):
    folder = os.path.join(config.get_BOOKS(), get_current_user_id(sub))
    if not os.path.exists(folder):
        os.makedirs(folder)
        return {
            'folder': folder
        }
