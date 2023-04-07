-- 1. TABLE users
--drop table customer_user cascade;
create table users (
	id uuid unique not NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	name VARCHAR ( 50 ) unique not null,
    email VARCHAR ( 255 ) unique,
	password VARCHAR ( 50 ) not null
);

INSERT INTO users (name, email, password) VALUES
	('user1', 'user1@tut.by', 'password1'),
    ('user2', 'user2@google.com', 'password1'),
    ('user3', 'user3@olx.pl', 'password1'),
    ('user4', null, 'password1')
;
--delete from users cascade;
select * from users;


-- 2. TABLE products
drop table products cascade;
create table products (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR ( 255 ),
    description VARCHAR ( 255 ),
	price numeric
);
INSERT INTO products(title, description, price) VALUES
	('Genelec 8040', 'Near field', 800),
    ('Genelec 1032 CPM', 'Middle', 2000),
    ('Adam A77H', 'Active', 1200)
;
select * from products;


-- 3. TABLE carts
CREATE TYPE status_enum AS ENUM ('OPEN', 'ORDERED');
create table carts (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at timestamp DEFAULT NOW(),
	updated_at timestamp DEFAULT NOW(),
	status status_enum,
    user_id UUID REFERENCES users(id),
	items UUID[]
--  Just an UUIDs array, to avoid [ExceptionsHandler] column "items" does not exist.
--	As according to:
--  https://stackoverflow.com/questions/41054507/postgresql-array-of-elements-that-each-are-a-foreign-key
--  it is impossible to have an array of references, like:
--  FOREIGN KEY (EACH ELEMENT OF items) REFERENCES products(id)
);
select * from carts;
--drop table carts cascade;

INSERT INTO carts (user_id, status) VALUES 
      ('66b10748-be76-4dad-bcf5-ec85bcd934db', 'OPEN')
--    ('c3044310-cf82-402a-9b51-2717ea2e1aad', 'ORDERED')
--    ('8d1c401d-dc3a-450e-b5d2-914ccfe7c768', '2023-01-01', '2023-01-01', 'OPEN'),
--    ('2052e393-317f-4485-a3cc-078b93859c80', '2023-01-01', '2023-01-01', 'ORDERED'),
--    ('7b72c91f-c936-4966-a711-db2b617da2de', '2023-01-01', '2023-01-01', 'OPEN')
;
select * from carts;
--delete from carts cascade;



-- 4. TABLE cart_items
--drop table cart_items CASCADE;
create table cart_items (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	cart_id uuid not null references carts(id),
    product_id uuid not null references products(id),
	count integer not null default 0
);

INSERT INTO cart_items (cart_id, product_id, count) VALUES 
    ('3529c866-e42f-4bb2-89ee-de603cb0da26', '08dad7bc-1403-476c-a489-f371cec533ab', 23)
;
--delete from cart_items;
select * from cart_items order by cart_id;


-- 5. TABLE orders
CREATE TYPE order_status_enum AS ENUM ('CREATED', 'SHIPPED', 'DELIVERED');
--drop table orders cascade;
create table orders (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id uuid not null references carts(id),
    user_id uuid not null references users(id),
    payment VARCHAR ( 255 ),
    delivery VARCHAR ( 255 ),
    comments VARCHAR ( 255 ),
    status order_status_enum,
	total numeric CONSTRAINT positive_price CHECK (total > 0)
);
select * from orders;
--delete from orders;