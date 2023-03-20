class WishList:
    def __init__(self, id = 0):
        self._id = id

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, id):
        self._id = id

    def toString(self):
        return f"WishList {self.id}"