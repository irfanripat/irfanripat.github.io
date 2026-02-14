---
title: 'Mastering SQL Indexing Strategies'
date: '2026-02-12'
description: 'How to move beyond simple indexes. A deep dive into B-Tree, GIN, and Composite indexes to supercharge your database response times.'
tags: ['sql', 'performance', 'database']
---

One of the first things a backend engineer learns about performance is "add an index." However, as your database grows from thousands to billions of rows, simple indexing is no longer enough. In fact, uninformed indexing can become a liability, slowing down your write operations without providing the read efficiency you expected. In this article, we’ll explore the internal structures of common indexes and how to choose the right strategy for your workload.

### The Standard: B-Tree Indexes

Almost every relational database (PostgreSQL, MySQL, SQL Server) uses the **B-Tree (Balanced Tree)** as its default index type. A B-Tree is a self-balancing tree data structure that maintains sorted data and allows for searches, sequential access, insertions, and deletions in logarithmic time.

When you search for a value in a B-Tree, the database traverses the tree from the root node to a leaf node. Because the tree is balanced, every lookup takes roughly the same number of steps. B-Trees are exceptionally good for:
- Exact matches (`id = 123`)
- Range queries (`price > 10.00 AND price < 50.00`)
- Sorting (`ORDER BY name`)

### The "Leftmost Prefix" Rule for Composite Indexes

A common mistake is creating individual indexes for every column when you often query them together. This is where **Composite Indexes** (indexes on multiple columns) come in. 

Imagine you have an index on `(last_name, first_name)`. The database sorts the index by `last_name` first, and then by `first_name` for people with the same last name.

Because of this structure, this index can be used for:
1. Queries on `last_name` only.
2. Queries on `last_name` AND `first_name`.

However, it **cannot** be used for a query on only `first_name`. The database would have to scan the entire index (an Index Scan), which is much slower than a direct lookup (an Index Seek). This is known as the *Leftmost Prefix Rule*. When designing composite indexes, always put the most selective columns (the ones that filter the most rows) or the ones most frequently used as the leading columns.

### PostgreSQL Specialized: GIN and GIST

If you are working with PostgreSQL and dealing with unstructured data like JSONB or Full-Text search, B-Trees are useless. This is where **GIN (Generalized Inverted Index)** shines.

A GIN index essentially creates a list of keys and pointers to the rows that contain them. If you have a `user_metadata` JSONB column and you want to find all users with the "active" tag:

```sql
SELECT * FROM users WHERE metadata @> '{"status": "active"}';
```

A B-Tree would require a full table scan. A GIN index, however, stores every key and value pair separately, allowing for near-instant lookup of keys nested deep within your JSON objects.

### The Hidden Cost of Indexing

Every index you add is a new data structure that the database MUST update every time you `INSERT`, `UPDATE`, or `DELETE` a row. 

- **Storage Cost**: Large indexes can easily double or triple the size of your database on disk.
- **Write Latency**: Adding five indexes to a table means every write now has to update six different structures (the table + 5 indexes).

### How to Audit Your Indexes

A professional engineer doesn't guess; they measure. Use the `EXPLAIN ANALYZE` command to see if your query is actually using the index you built. 

```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE status = 'shipped';
```

Look for terms like `Index Scan` (good) vs `Seq Scan` (bad - Sequential Scan). If you see a Sequential Scan on a large table despite having an index, it might be because your index doesn't follow the Leftmost Prefix Rule or the database decided the table is small enough that a full scan is actually faster.

### Conclusion

Indexing is a balance of art and science. By mastering B-Trees for your standard relational data, understanding the rules of Composite indexes, and leveraging specialized types like GIN for document data, you can build systems that remain lighting-fast regardless of scale. Don't just "add an index"—build an indexing strategy.
