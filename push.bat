@echo off
git add .
git commit -m %1
git push -u 256ch master
@echo on