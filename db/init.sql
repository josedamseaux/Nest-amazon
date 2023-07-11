SELECT 'CREATE DATABASE nest_amazon_ec2'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE pg_database.datname = 'nest_amazon_ec2');