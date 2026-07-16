#!/bin/bash
echo "========================================"
echo " 文档转换工具 - 方案B (Web + Python)"
echo "========================================"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "[1/2] 启动后端服务..."
cd "$DIR/backend" && python main.py &
BACKEND_PID=$!

echo "[2/2] 启动前端开发服务器..."
cd "$DIR/frontend" && npx vite --host &
FRONTEND_PID=$!

echo ""
echo "启动完成！请在浏览器打开:"
echo "  前端: http://localhost:5173"
echo "  后端: http://localhost:8000/docs"
echo ""
echo "按 Ctrl+C 停止所有服务"

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" SIGINT SIGTERM
wait
