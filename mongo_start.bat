rem start mangodb server

@echo off

rem mongoDB install packge

d:

rem text color

color 0a

rem install dir bin

cd D:/soft/mangodb/bin

rem start all ip

mongod --dbpath D:/mangodb/data --bind_ip_all