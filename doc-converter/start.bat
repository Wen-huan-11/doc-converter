@echo off
chcp 65001 >nul
title 文档转换工具
set "ROOT=%~dp0"

echo ========================================
echo  文档转换工具
echo ========================================
echo.
echo [1/2] 启动后端 (端口 8001)...
start "Backend" cmd /k "cd /d %ROOT%backend && python main.py"

echo [2/2] 启动前端 (端口 5173)...
start "Frontend" cmd /k "cd /d %ROOT%frontend && npx vite --host"

echo.
echo 等待 5 秒...
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo  在浏览器打开: http://localhost:5173
echo ========================================
echo.
echo 如果打不开，检查 Backend 窗口是否有报错
pause
