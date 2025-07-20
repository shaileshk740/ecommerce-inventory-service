E-commerce Inventory Management Service
1. Purpose
This PRD defines the requirements for a simple e-commerce inventory management service. Use coding assistants like GitHub Copilot, Cursor OR Windsurf and your preferred framework to build it.
We are not focusing on authentication or authorization in this assignment.  
You can assume that the system is being used by an Admin, who has full access to manage products, categories, and SKUs.
2. Entities & Relationships
•	Entities
o	Category: Used to group products (e.g., Electronics, Apparel).
o	Product: Represents a general product concept (e.g., "iPhone 15").
o	SKU: Represents a sellable variant of a product (e.g., "iPhone 15 - 128GB - Black").
•	Relationships
o	A Product belongs to one Category.
o	A Product can have many SKUs.
o	A SKU belongs to one Product.
3. Requirements
3.1 Build Rest APIs for
•	Category
o	Create, Read, Update, Delete Categories
o	List all categories
•	Product
o	Create, Read, Update, Delete Products
o	List Products with:
	Search by product name
	Filter by category
	Pagination (page & pageSize params)
o	Each Product must belong to an existing Category
•	SKU
o	Add, Update, Delete SKUs for a Product
o	Each SKU must belong to a valid Product
o	Return all SKUs of a product
3.2 Expectation
•	The code should be of production grade.
•	Handle all the necessary validations, relationships, edge cases.
•	Write Unit tests and share the coverage report.
•	For I3 and above ensure code-quality, code-structure, API documentation, complete test coverage.
4. Deliverables
•	Create a new GitHub PRIVATE Repo using your Talentica email
•	Push the entire new solution to the repo
•	Share the GitHub repo with the below users:
o	dmistryTal
o	nileshmallick1606
o	Sachin-Salunke-Talentica
•	The repo should contain:
o	Entire source code.
o	README.md — project overview, setup, run instructions
o	Project-structure.md file
o	Copilot Chat Export.md
	Export of the entire chat history.
	If you have used multiple chat windows that extract all and stitch in a single file
