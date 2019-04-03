#!/bin/bash

node create-sql.js

cat delete.sql script.sql > all.sql
