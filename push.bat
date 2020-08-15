@echo off
git add .
git commit -m %1
git remote add 256ch https://github.com/TarochanChannel/256ch.git
git push -u 256ch master
@echo on