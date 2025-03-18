# Order Management Project

This project consists of both a **backend** and a **frontend**
The data is pre-populated using src/migrations/1742244531377-SeedOrders.ts

## Getting Started

To start the project, follow these steps:

```bash
# Start the backend
cd order-management-be
docker-compose up  

# Start the frontend
cd ../order-management-fe 
docker-compose up  
```
Stopping the Project

To shut down all running services, use:
``` bash
docker-compose down
```
### What I would like to add if I had more time:
1. Tests & Linter
2. Better UI/UX
3. Server-Side Validations
4. Additional Database Fields – Include timestamps such as created_at
5. Monitoring & Logging
6. Monetary Precision – Ensure the amount field uses proper monetary structures to prevent rounding errors
8. Custom Order ID Generation – Replace nanoid with a custom implementation to avoid reliance on third-party libraries for a critical system component
9. Caching, though it might be an overkill
10. Dropdowns/Helpers for Currency & Country Selection – Improve input UX with pre-defined options

### This is as far as I managed to get
1. Create Order Form that allows you to insert an order into the database.
2. DB runs inside a docker container
3. A page that displays the list of orders, with two filters: 
   1) a filter for the country
   2) A filter for the description where users could input text and search by description.(Used a fullText search on pg side)
4) Sorting orders according to the spec ( Orders in Estonia (if present) should go first, then sort by the payment due date ascending)
5) Backend – Supports order persistence, filtering by country, and description-based search
6) Order ID Generation – The backend assigns unique order IDs using nanoid
7) Pre-populated table orders from 1742244531377-SeedOrders.ts migration


