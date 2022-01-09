import sys, os

INTERP = "/home/royalsistema/royalweb/python396/bin/python"
if sys.executable != INTERP: os.execl(INTERP, INTERP, *sys.argv)

from royalback.wsgi import application
