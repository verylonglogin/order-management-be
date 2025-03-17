## To start the project 
```bash
cd order-management-be
docker-compose up  

cd ../order-management-fe 
docker-compose up  


```
## to stop 
``` bash
docker-compose down
```
### What I would like to add if I had more time:
1. Tests & linter
2. Better UI/UX
3. validations on server side 
4. add more columns in db like created_at
5. Monitoring
6. Logging
7. Field 'amount' should use proper monetary structures, to handle precision and rounding issues
8. I'm not happy with the search by payment description, I used pg websearch_to_tsquery, but would investigate more
9. I'm not happy with using nanoid for order.id generation, I'd write my own function for this purpose, because it's a crucial part of the system and I wouldn't want to depend on third party library
10. Caching, though it might be an overkill
11. Drop-downs/helpers for currency and countries

### This is as far as I managed to get
1. Create Order Form that allows you to insert an order into the database.
2. DB runs inside a docker container
3. A page that displays the list of orders, with two filters: 
   1) a filter for the country
   2) A filter for the description where users could input text and search by description.(Used a fullText search on pg side)
4) Sorting orders according to the spec ( Orders in Estonia (if present) should go first, then sort by the payment due date ascending)
5) The backend application should allow us to persist the orders in the database and to filter by country and description text.
6) BE generates unique IDs for each order (using nanoid)


