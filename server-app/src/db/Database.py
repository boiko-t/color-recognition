import sqlite3
from .scripts import *

DATABASE_PATH = r"/app/db/database.db"

class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]

class Database(metaclass=Singleton):
    connection = None

    def connect(self):
        if self.connection is None:
            self.connection = sqlite3.connect(DATABASE_PATH, check_same_thread=False)
            self.cursor = self.connection.cursor()
            self.__create_tables()
        return self.cursor

    def __create_tables(self):
        self.cursor.execute(sql_create_brands_table)
        self.cursor.execute(sql_create_products_table)
        self.cursor.execute(sql_create_users_table)
        self.cursor.execute(sql_create_fav_products_table)
        self.cursor.execute(sql_create_fav_price_categories_table)
