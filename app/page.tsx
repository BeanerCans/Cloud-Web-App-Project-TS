'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Cookies from 'js-cookie';

type Tab = { title: string; content: string };

export default function Home() {
  const [tabs, setTabs] = useState<Tab[]>([
    { title: 'Tab 1', content: 'Hello from Tab 1' },
    { title: 'Tab 2', content: 'Hello from Tab 2' },
  ]);
  const [active, setActive] = useState(0);
  const [last, setLast] = useState<string | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setLast(Cookies.get('activeMenu') || null);
  }, []);

  const html = useMemo(() => {
    const esc = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const tabButtons = tabs.map((t, i) => 
      `<button role="tab" id="tab-${i}" aria-selected="${i===active}" aria-controls="panel-${i}" tabindex="${i===active?0:-1}" style="padding:8px 12px;border:none;border-bottom:2px solid ${i===active?'#000':'#aaa'};background:#eee;cursor:pointer">${esc(t.title)}</button>`
    ).join('');

    const tabPanels = tabs.map((t, i) => 
      `<div role="tabpanel" id="panel-${i}" aria-labelledby="tab-${i}" ${i===active?'':'hidden'} style="padding:12px;border:1px solid #ccc;margin-top:-1px">${esc(t.content)}</div>`
    ).join('');

    const style = `<style>
      html,body { margin:0; font-family:sans-serif; }
      [role="tablist"] { display:flex; gap:4px; padding:8px; background:#f5f5f5; border-bottom:1px solid #ccc; }
      button:focus { outline:2px solid #444; outline-offset:2px; }
    </style>`;

    const script = `<script>
      (function(){
        const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
        const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
        function setActive(idx){
          tabs.forEach((b,i)=>{
            const sel=i===idx;
            b.setAttribute('aria-selected',sel);
            b.tabIndex=sel?0:-1;
            panels[i].hidden=!sel;
            b.style.borderBottomColor=sel?'#000':'#aaa';
          });
          tabs[idx].focus();
        }
        tabs.forEach((b,i)=>{
          b.addEventListener('click',()=>setActive(i));
          b.addEventListener('keydown',e=>{
            const k=e.key;
            if(k==='ArrowRight') setActive((i+1)%tabs.length);
            else if(k==='ArrowLeft') setActive((i-1+tabs.length)%tabs.length);
            else if(k==='Home') setActive(0);
            else if(k==='End') setActive(tabs.length-1);
          });
        });
        setActive(${active});
      })();
    </script>`;

    return `<!doctype html>
<html lang="en"><meta charset="utf-8">
<title>Tabs</title>
${style}
<div role="tablist" aria-label="Sample Tabs">${tabButtons}</div>
${tabPanels}
${script}
</html>`;
  }, [tabs, active]);

  const copy = async () => {
    await navigator.clipboard.writeText(html);
    alert('Copied!');
  };

  const preview = () => {
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
    window.open(url, '_blank');
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      const prev = (idx - 1 + tabRefs.current.length) % tabRefs.current.length;
      tabRefs.current[prev]?.focus();
      setActive(prev);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      const next = (idx + 1) % tabRefs.current.length;
      tabRefs.current[next]?.focus();
      setActive(next);
    }
  };

  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Tabs Code Generator</h1>

      {last && last !== '/' && (
        <p>
          Continue where you left off: <a href={last}>{last}</a>
        </p>
      )}

      {tabs.map((t, i) => (
        <div key={i} className="border p-2 mb-2 rounded">
          <label>Title
            <input
              className="block border p-1 w-full"
              value={t.title}
              onChange={(e) => {
                const c=[...tabs]; c[i].title=e.target.value; setTabs(c);
              }}
            />
          </label>
          <label>Content
            <textarea
              className="block border p-1 w-full"
              rows={3}
              value={t.content}
              onChange={(e) => {
                const c=[...tabs]; c[i].content=e.target.value; setTabs(c);
              }}
            />
          </label>
          <button onClick={() => setActive(i)}>
            Set as Default
          </button>
          <button onClick={() => setTabs(tabs.filter((_,j)=>j!==i))}>
            Remove Tab
          </button>
        </div>
      ))}
      <button onClick={()=>setTabs([...tabs,{title:`Tab ${tabs.length+1}`,content:'...'}])}>
        + Add Tab
      </button>

      <div className="flex gap-2 mt-4">
        <button onClick={copy}>Copy HTML</button>
        <button onClick={preview}>Preview</button>
      </div>

      <textarea className="border w-full p-2 mt-4" rows={16} readOnly value={html}/>

      {/* Tabs Section */}
      <div>
        <h2 className="text-xl mb-2">Tabs</h2>
        <div className="mb-2 flex items-center gap-2">
          <span className="font-semibold">Tabs Headers:</span>
          <button
            className="border px-2"
            onClick={() => setTabs([...tabs, { title: `Tab ${tabs.length + 1}`, content: '...' }])}
          >
            [+]
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              ref={el => (tabRefs.current[idx] = el)}
              tabIndex={0}
              className={`px-2 py-1 border ${active === idx ? 'border-black' : 'border-transparent'}`}
              onClick={() => setActive(idx)}
              onKeyDown={e => {
                if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                  const prev = (idx - 1 + tabs.length) % tabs.length;
                  setActive(prev);
                  tabRefs.current[prev]?.focus();
                } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                  const next = (idx + 1) % tabs.length;
                  setActive(next);
                  tabRefs.current[next]?.focus();
                }
              }}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Content */}
      <div>
        <h2 className="text-xl mb-2">Tabs Content</h2>
        <div className="border p-4 min-w-[200px]">
          {tabs[active]?.content}
        </div>
      </div>

      {/* Output and Code */}
      <div className="flex flex-col gap-2">
        <label>
          Output
          <input className="border ml-2" style={{ width: 100 }} />
        </label>
        <div className="border-4 border-black p-2 min-w-[250px] min-h-[150px]">
          {/* Simulated code output */}
          <pre className="text-xs">
{`<div>
  <h2>Tabs Content</h2>
  <ol>
    <li>Install VSCode</li>
    <li>Install Chrome</li>
    <li>Install Node</li>
    <li>etc</li>
  </ol>
</div>`}
          </pre>
        </div>
      </div>
    </main>
  );
}
