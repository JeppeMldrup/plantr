#!/bin/sh
export $(grep -v '^#' .env | xargs)
./mvnw spring-boot:run
