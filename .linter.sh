#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-102858-128d7a36/tic_tac_toe
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

