from ..utils import config
import os


def get_init(user_id):
    folder = os.path.join(config.get_BOOKS(), user_id)
    if not os.path.exists(folder):
        os.makedirs(folder)
        return {
            'folder': folder
        }
