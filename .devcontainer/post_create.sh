echo "Installing poetry..."
curl -sSL https://install.python-poetry.org | python3 - || exit 1
echo "export PATH=$PATH:$HOME/.local/bin" >> ~/.bashrc && . ~/.bashrc || exit 1
cd /workspaces/intuitivo-ai-back-challenge/backend || exit 1
poetry config virtualenvs.in-project true || exit 1
echo "Installing dependencies..."
poetry install || exit 1
echo "Done!"
echo "Migrating models..."
. /workspaces/intuitivo-ai-back-challenge/backend/.venv/bin/activate || exit 1
python /workspaces/intuitivo-ai-back-challenge/backend/manage.py migrate || exit 1
echo "Done!"