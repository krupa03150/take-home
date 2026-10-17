#!/usr/bin/env python3
"""Detach / supervise Next.js on 127.0.0.1:43127 so it survives agent shell exit."""
import os, sys, time, subprocess, signal
from pathlib import Path

repo = Path('/Users/krupapatel/Documents/GitHub/take-home')
log = repo / '.dev-43127.log'
pidfile = repo / '.dev-43127.pid'
supervisefile = repo / '.dev-43127.supervisor.pid'
node = '/usr/local/bin/node'
nextbin = str(repo / 'node_modules/next/dist/bin/next')

def port_up() -> bool:
    try:
        import urllib.request
        urllib.request.urlopen('http://127.0.0.1:43127/', timeout=1)
        return True
    except Exception:
        return False

def supervise_forever():
    os.chdir(str(repo))
    os.environ['PATH'] = '/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin'
    os.environ['HOME'] = '/Users/krupapatel'
    signal.signal(signal.SIGHUP, signal.SIG_IGN)
    supervisefile.write_text(str(os.getpid()))
    so = open(log, 'a')
    while True:
        if port_up():
            so.write(f'monitor ok pidfile={pidfile.read_text().strip() if pidfile.exists() else "?"}\n'); so.flush()
            time.sleep(5)
            continue
        so.write('\n--- launching next ---\n'); so.flush()
        os.system("lsof -tiTCP:43127 -sTCP:LISTEN | xargs kill -9 2>/dev/null")
        time.sleep(0.3)
        p = subprocess.Popen(
            [node, nextbin, 'dev', '--hostname', '127.0.0.1', '--port', '43127'],
            cwd=str(repo), stdin=subprocess.DEVNULL, stdout=so, stderr=so,
            start_new_session=True, env=os.environ.copy(),
        )
        pidfile.write_text(str(p.pid))
        so.write(f'next pid={p.pid}\n'); so.flush()
        # wait until process dies OR port drops
        while p.poll() is None:
            time.sleep(2)
        so.write(f'next exited {p.returncode}; restart in 2s\n'); so.flush()
        time.sleep(2)

# If already a supervisor, just report for CLI callers
if '--check' in sys.argv:
    print('up' if port_up() else 'down')
    sys.exit(0 if port_up() else 1)

# Detach when not under launchd (launchd already supervises)
under_launchd = os.environ.get('XPC_SERVICE_NAME') == 'com.krupa.alto-dev-43127'
if under_launchd:
    # stay in foreground for KeepAlive
    sys.stdout = open(log, 'a')
    sys.stderr = sys.stdout
    print('launchd supervisor start', flush=True)
    supervise_forever()
else:
    if os.fork() > 0:
        for _ in range(60):
            time.sleep(0.25)
            if port_up():
                print('LIVE_URL=http://127.0.0.1:43127')
                sys.exit(0)
        print('FAILED_TO_START', file=sys.stderr)
        sys.exit(1)
    os.setsid()
    if os.fork() > 0:
        sys.exit(0)
    si = open('/dev/null', 'r')
    so = open(log, 'a')
    os.dup2(si.fileno(), 0)
    os.dup2(so.fileno(), 1)
    os.dup2(so.fileno(), 2)
    supervise_forever()
