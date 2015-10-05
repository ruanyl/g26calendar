g26calendar
-------------

start server:

```
npm install
npm run start
```

setup mongodb

```
mkdir -p data/db
mongod --dbpath ./data/db/
```
### step 1

- [x] Fetching, creating, deleting and editing events works
- [x] Well thought out, sane REST API. Uses also other methods than HTTP GET
- [ ] Possible to perform searches on events, matches returned. E.g. list all events which are scheduled for this Wednesday
- [x] Events are stored in a database. Events in the db can be stored, fetched, deleted and modified.
- [x] Brief documentation on how to install/use the application.
- [ ] more features?
