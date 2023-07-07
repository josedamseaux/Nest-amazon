SELECT 'CREATE DATABASE nest-amazon-ec2'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE pg_database.datname = 'nest-amazon-ec2');