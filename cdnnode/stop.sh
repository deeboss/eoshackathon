#!/bin/#!/usr/bin/env bash

kill -9 `ps aux |grep -v grep|grep node\ app.js|awk '{print $2}'`
