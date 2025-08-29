'use client';

import { useState, useMemo, useEffect } from 'react';
import Cookies from 'js-cookie';

type Tab = { title: string; content: string };

export default function Home() {
  const [tabs, setTabs] = useState<Tab[]>([
    { title: 'Tab 1', content: 'Hello from Tab 1' },
    { title: 'Tab 2', content: 'Hello from Tab 2' },
  ]);
  const [active, setActive] = useState(0);
  const [last, setLast] = useState<string | null>(null);

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
    </main>
  );
}
