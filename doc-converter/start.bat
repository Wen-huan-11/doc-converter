@echo off
chcp 65001 >nul
title 文档转换工具

echo ========================================
echo  文档转换工具 - 方案B (Web + Python)
echo ========================================
echo.

set "ROOT=%~dp0"

echo [1/2] 启动后端服务...
start "Backend" cmd /k "cd /d "%ROOT%backend" && python main.py"

echo [2/2] 启动前端开发服务器...
start "Frontend" cmd /k "cd /d "%ROOT%frontend" && npx vite --host"

echo.
echo 等待服务启动...
timeout /t 5 /nobreak >nul

echo 启动完成！请在浏览器打开:
echo   前端: http://localhost:5173
echo   后端: http://localhost:8000/docs
echo.
echo 提示: 如果页面显示 "Failed to fetch"，请确认 Backend 窗口中的 Python 是否正常启动。
pause
