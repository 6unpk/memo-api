#!/bin/bash

# Check Docker & Docker Compose & Yarn
if ! command -v docker &> /dev/null
then
    echo "docker could not be found"
    echo "Docker가 설치되지 않았거나 PATH에 등록되지 않았습니다!"
    exit
fi


if ! command -v docker-compose &> /dev/null
then
    echo "docker-compose could not be found"
    echo "Docker Compose가 설치되지 않았거나 PATH에 등록되지 않았습니다!"
    exit
fi

if ! command -v yarn &> /dev/null
then
    echo "yarn could not be found"
    echo "Yarn이 설치되지 않았거나 PATH에 등록되지 않았습니다!"
    exit
fi


# Run Yarn install
yarn

# Run docker-compose
docker-compose up

