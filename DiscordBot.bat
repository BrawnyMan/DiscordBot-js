@echo off

:TEST
ping www.google.com -n 1 | find "TTL=" > nul
if errorlevel 1 (
  goto RESET
) else (
  goto RUN  
)

:RESET
ping 127.0.0.1 -n 11 > nul
goto TEST

:RUN
D:
cd <path_to_bot>
cls
node .
pause
