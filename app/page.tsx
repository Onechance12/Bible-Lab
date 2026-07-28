"use client";

import { useEffect, useMemo, useState } from "react";

const scenes = [
  { n: "01", title: "The crowded house", text: "Jesus returned to Capernaum. So many gathered that there was no room, even at the door, and he preached the word to them.", ref: "Mark 2:1–2" },
  { n: "02", title: "An impossible entrance", text: "Four people carried a paralyzed man. Unable to reach Jesus through the crowd, they opened the roof and lowered the man down.", ref: "Mark 2:3–4" },
  { n: "03", title: "The unexpected words", text: "When Jesus saw their faith, he said to the paralyzed man, ‘Son, your sins are forgiven.’", ref: "Mark 2:5" },
  { n: "04", title: "The challenge", text: "Some scribes questioned him silently. Jesus knew their thoughts and asked which was easier: to forgive sins, or to tell the man to rise and walk?", ref: "Mark 2:6–9" },
  { n: "05", title: "The visible proof", text: "So they would know the Son of Man has authority on earth to forgive sins, Jesus told the man to rise. He stood, took his mat, and walked out.", ref: "Mark 2:10–12" },
];

const choices = [
  "Jesus rewards persistence by granting the man’s original request.",
  "The healing provides visible evidence for Jesus’ invisible authority to forgive.",
  "The crowd learns that physical healing matters more than forgiveness.",
];

export default function Home() {
  const [scene, setScene] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [hint, setHint] = useState(false);
  const [answer, setAnswer] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bible-lab-progress");
    if (saved) setScene(Math.min(Number(saved), scenes.length - 1));
  }, []);
  useEffect(() => localStorage.setItem("bible-lab-progress", String(scene)), [scene]);

  const progress = useMemo(() => Math.round(((scene + (finished ? 1 : 0)) / 6) * 100), [scene, finished]);
  const questions = ["What obstacle has the story introduced?", "What does the group’s action reveal?", "Why are Jesus’ words surprising?", "What problem must Jesus’ question resolve?"];

  return <main>
    <header className="topbar"><a className="brand" href="#"><span>B</span>BIBLE LAB</a><div className="streak"><i>◆</i> Day 1</div></header>
    <div className="shell">
      <aside>
        <p className="eyebrow">LESSON ZERO</p><h1>Authority<br/>you can see.</h1>
        <p className="intro">Investigate Mark 2:1–12 and discover why Jesus heals a man after forgiving him.</p>
        <div className="skill"><div><span>Understanding</span><b>{progress}%</b></div><div className="track"><i style={{width:`${progress}%`}}/></div></div>
        <nav aria-label="Lesson scenes">
          {scenes.map((item,i)=><button key={item.n} disabled={i>scene} className={i===scene?"active":i<scene?"done":""} onClick={()=>setScene(i)}><span>{i<scene?"✓":item.n}</span><div><small>SCENE {i+1}</small>{item.title}</div></button>)}
          <button disabled={!finished} className={finished?"done":""}><span>{finished?"✓":"06"}</span><div><small>FINAL</small>Teach it back</div></button>
        </nav>
      </aside>
      <section className="workspace">
        <div className="labtag">OBSERVATION LAB <span>•</span> MARK 2:1–12</div>
        <article className="passage"><div className="scenehead"><span>{scenes[scene].n}</span><div><small>SCENE {scene+1} OF 5</small><h2>{scenes[scene].title}</h2></div></div><blockquote>{scenes[scene].text}</blockquote><p className="reference">{scenes[scene].ref} · adapted for prototype</p></article>
        {scene<4 ? <div className="prompt"><p className="eyebrow">YOUR MOVE</p><h3>{questions[scene]}</h3><p>Put your observation into your own words before continuing.</p><textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="I notice that…"/><div className="actions"><button className="hint" onClick={()=>setHint(!hint)}>◇ {hint?"Hide hint":"Give me a hint"}</button><button className="primary" disabled={answer.trim().length<8} onClick={()=>{setScene(scene+1);setAnswer("");setHint(false)}}>Continue <span>→</span></button></div>{hint&&<div className="hintbox">Look for the difference between what people expected Jesus to do and what he actually did.</div>}</div>
        : !checked ? <div className="prompt"><p className="eyebrow">CONNECT THE EVIDENCE</p><h3>What role does the healing play in this story?</h3><div className="choices">{choices.map((text,i)=><button key={text} className={choice===i?"selected":""} onClick={()=>setChoice(i)}><span>{String.fromCharCode(65+i)}</span>{text}</button>)}</div><div className="actions end"><button className="primary" disabled={choice===null} onClick={()=>setChecked(true)}>Check my reasoning <span>→</span></button></div></div>
        : <div className="prompt feedback"><p className="eyebrow">{choice===1?"STRONG READING":"LOOK AGAIN"}</p><h3>{choice===1?"The visible act supports the invisible claim.":"The story gives us a more specific connection."}</h3><p>{choice===1?"The man walking out demonstrates that Jesus’ claim to forgive is not empty speech.":"Return to Jesus’ purpose in verses 10–11: ‘so that you may know’ he has authority to forgive."}</p><label>Now teach it back in one sentence.</label><textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="The central point is…"/><div className="actions end"><button className="primary" disabled={answer.trim().length<20} onClick={()=>setFinished(true)}>{finished?"Lesson complete ✓":"Complete lesson"}</button></div></div>}
      </section>
    </div>
  </main>;
}
