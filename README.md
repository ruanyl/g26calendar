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
- [x] Possible to perform searches on events, matches returned. E.g. list all events which are scheduled for this Wednesday
- [x] Events are stored in a database. Events in the db can be stored, fetched, deleted and modified.
- [x] Brief documentation on how to install/use the application.
- [x] more features? find events by priority

### API Endpoint

get event by id
```
GET /event/:id
```

list all events
```
GET /event
```

save a event
```
POST /event
```
input data
```
{
    title: <title of the event>
    content: <description of the event>
    start: <start time>
    end: <end time>
}
```

delete an event by id
```
DELETE /event/:id
```

update an event by id
```
PUT /event/:id
```
input data
```
{
    title: <title of the event>
    content: <description of the event>
    start: <start time>
    end: <end time>
}
```

```
GET /event/w/:day
```
for example: `/event/w/Monday`, will get all the events of this Monday

```
POST /event/search
```
example: search by priority
```
{
    priority: 2
}
```
