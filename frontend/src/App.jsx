import {useEffect,useState,useRef} from 'react';
import {BrowserRouter,Routes,Route,Link,NavLink,useParams,useNavigate,useLocation} from 'react-router-dom';
import {Phone,Mail,MapPin,ArrowRight,ChevronUp,Star,Clock,ShieldCheck,GraduationCap,Heart,Users,CalendarDays,Menu,X,CreditCard,Banknote,LayoutDashboard,Stethoscope,Activity,IndianRupee,Trash2,Volume2,Square,User,Lock,Eye,EyeOff,UserPlus,HeartPulse,BadgeCheck,CheckCircle2,ChevronDown,RefreshCw,Wallet} from 'lucide-react';
import {Toaster,toast} from 'react-hot-toast';
import './App.css';
import logo from './assets/logo.png'; import banner from './assets/doctors_group_photo.png'; import SignupBg from './assets/LoginBg.png';
import D1 from './assets/D1.png'; import D2 from './assets/D2.png'; import D3 from './assets/D3.png'; import D4 from './assets/D4.png'; import D5 from './assets/D5.png'; import D6 from './assets/D6.png'; import D7 from './assets/D7.png';
import drArjunMehta from './assets/doctors/arjun_mehta.jpg'; import drAnanyaKapoor from './assets/doctors/ananya_kapoor.jpg'; import drKaranPatel from './assets/doctors/karan_patel.png'; import drRohanSharma from './assets/doctors/rohan_sharma.jpg'; import drVikramRao from './assets/doctors/vikram_rao.jpg'; import drMeeraNair from './assets/doctors/meera_nair.jpg';
import S1 from './assets/S1.png'; import S2 from './assets/S2.png'; import S3 from './assets/S3.png'; import S4 from './assets/S4.png'; import S5 from './assets/S5.png'; import S6 from './assets/S6.png'; import S7 from './assets/S7.png'; import S8 from './assets/S8.png';
import C1 from './assets/C1.png'; import C2 from './assets/C2.png'; import C3 from './assets/C3.png'; import C5 from './assets/C5.png'; import C6 from './assets/C6.png';
import Login from './pages/Login/Login';
import {usePatientSession,useAdminSession,checkAdminCredentials,setAdminSession,clearAdminSession,getUsers,saveUsers,setSession,clearSession} from './utils/auth';
const API=import.meta.env.VITE_API_URL||'http://localhost:5000'; const doctorImgs=[D1,D2,D3,D4,D5,D6]; const serviceImgs=[S1,S2,S3,S4,S5,S6,S7,S8];
const SPECIALTY_FEES={Cardiology:1800,Neurology:2000,Orthopedics:1200,Dermatology:1000,Gynecology:1000,Pediatrics:900};
const DOCTOR_IMAGES={"Dr. Arjun Mehta":drArjunMehta,"Dr. Ananya Kapoor":drAnanyaKapoor,"Dr. Karan Patel":drKaranPatel,"Dr. Rohan Sharma":drRohanSharma,"Dr. Vikram Rao":drVikramRao,"Dr. Meera Nair":drMeeraNair};
function getDoctorImage(d,i){return d?.imageUrl||DOCTOR_IMAGES[d?.name]||doctorImgs[i%doctorImgs.length]}
function getDoctorFee(d){return SPECIALTY_FEES[d?.specialization]??Number(d?.fee||500)}
function isDoctorAvailable(d){return (d?.availability||'Available')!=='Unavailable'}
function useApi(path){const [s,setS]=useState({loading:true,data:[],error:''});useEffect(()=>{fetch(API+path).then(r=>r.json().then(j=>({r,j}))).then(({r,j})=>{if(!r.ok)throw Error(j.message||'Request failed');setS({loading:false,data:j.data??j,error:''})}).catch(e=>setS({loading:false,data:[],error:e.message}))},[path]);return s}
function AuthNav(){const patient=usePatientSession();const navigate=useNavigate();if(patient)return <><span className="adminNav">Hi, {(patient.name||'Patient').split(' ')[0]}</span><button className="login" onClick={()=>{clearSession();toast.success('Signed out');navigate('/login')}}>Sign Out</button></>;return <Link className="login" to="/login">Login</Link>}
function Header(){const [open,setOpen]=useState(false);return <header className="header"><Link className="logo" to="/"><img src={logo}/><span><b>Satya-Hospital</b><small>Healthcare Solutions</small></span></Link><nav className={open?'open':''}>{[['Home','/'],['Doctors','/doctors'],['Services','/services'],['Appointments','/appointments'],['Contact','/contact']].map(x=><NavLink key={x[1]} to={x[1]} onClick={()=>setOpen(false)}>{x[0]}</NavLink>)}<div className="navAuth"><AuthNav/></div></nav><button className="hamb" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></header>}
function Footer(){return <footer><div className="footgrid"><div><div className="logo"><img src={logo}/><span><b>Satya-Hospital</b><small>Healthcare Solutions</small></span></div><p><i>Your trusted partner in healthcare innovation. We're committed to providing exceptional medical care with cutting-edge technology and compassionate service.</i></p><p><Phone/> +91 9515193331</p><p><Mail/> satvikkalasapudi@gmail.com</p><p><MapPin/> Hyderabad, India</p></div><div><h3>Quick Links</h3>{['Home','Doctors','Services','Contact','Appointments'].map(x=><Link key={x} to={x==='Home'?'/':'/'+x.toLowerCase()}>→ &nbsp;{x}</Link>)}</div><div><h3>Our Services</h3>{['General Physician Consultation','Blood Test (CBC)','X-Ray','Health Checkup Package','Vaccination'].map(x=><span key={x}>● &nbsp;{x}</span>)}</div><div><h3>Stay Connected</h3><p>Subscribe for health tips, medical updates, and wellness insights delivered to your inbox.</p><div className="subscribe"><input placeholder="Enter your email"/><button>Subscribe</button></div></div></div><div className="copyright">© 2026 Satya-Hospital Healthcare.<span>Designed by <b>Satvik Kalasapudi</b></span></div></footer>}
function Home(){const d=useApi('/api/doctors');return <><section className="hero"><div><span className="eyebrow">WELCOME TO SATYA-HOSPITALS</span><h1>Advanced Healthcare<br/><em>With A Human Touch</em></h1><p>Experience world-class medical care with our team of expert doctors, modern diagnostics, and compassionate service.</p><div className="heroBtns"><Link to="/doctors" className="btn">Book Appointment <ArrowRight/></Link><Link to="/services" className="btn outline">Our Services</Link></div><div className="stats"><b>25+<small>Expert Doctors</small></b><b>15K+<small>Happy Patients</small></b><b>24/7<small>Emergency Care</small></b></div></div><div className="heroPic"><div className="circle"></div><img src={banner}/></div></section><section className="cert"><h2>— CERTIFIED &amp; <span>EXCELLENCE</span> —</h2><p>Government recognized and internationally accredited healthcare standards</p><b className="certified">● &nbsp; OFFICIALLY CERTIFIED</b><div className="certScroll"><div className="certlogos">{[...Array(2)].flatMap((_,dup)=>[[C6,'Paramedical Council'],[C2,'Ministry of Health'],[C1,'Medical Commission'],[C5,'Government Approved'],[C3,'NABH Accredited'],[logo,'Medical Council']].map(([i,n])=><div key={dup+'-'+n}><img src={i}/><b>{n}</b></div>))}</div></div></section><section className="team"><h2>Our <em>Medical Team</em></h2><p>Book appointments quickly with our verified specialists.</p><DoctorGrid data={(Array.isArray(d.data)?d.data:[]).slice(0,4)}/><Link className="btn center" to="/doctors">View All Doctors <ArrowRight/></Link></section><section className="test"><h2>What Our Patients Say</h2><div className="testgrid"><blockquote>“Excellent doctors and a very smooth appointment experience.”<b>— Sarah Johnson</b></blockquote><blockquote>“Professional service, caring staff and modern facilities.”<b>— David Thompson</b></blockquote></div></section></>}
function DoctorGrid({data}){return <div className="doctorGrid">{data.map((d,i)=><Link className="doctorCard" to={'/doctors/'+(d._id||d.id)} key={d._id||i}><div className="docImg"><img src={getDoctorImage(d,i)}/><span className={isDoctorAvailable(d)?'availBadge':'availBadge unavailBadge'}>{isDoctorAvailable(d)?'Available':'Not Available'}</span></div><div className="docBody"><h3>{d.name}</h3><p>{d.specialization}</p><div><span><Star/> {d.rating||4.8}</span><b>₹{getDoctorFee(d)}</b></div><button>View Profile <ArrowRight/></button></div></Link>)}</div>}
function Doctors(){const x=useApi('/api/doctors');return <PageTitle title="Our Doctors" sub="Meet our experienced and trusted medical specialists."><>{x.loading?<p>Loading doctors...</p>:x.error?<p>{x.error}</p>:<DoctorGrid data={x.data}/>}</></PageTitle>}
function Services(){const x=useApi('/api/services');const [category,setCategory]=useState('All');const categories=[...new Set((Array.isArray(x.data)?x.data:[]).map(s=>s.category).filter(Boolean))];const filtered=(Array.isArray(x.data)?x.data:[]).filter(s=>category==='All'||s.category===category);return <PageTitle title="Our Diagnostic Services" sub="Safe, accurate & reliable testing."><>{categories.length>1&&<div className="serviceFilters">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>}{x.loading?<p>Loading services...</p>:x.error?<p>{x.error}</p>:filtered.length===0?<p>No services found.</p>:<div className="serviceGrid">{filtered.map((s,i)=><Link to={'/services/'+(s._id||s.id)} className="serviceCard" key={s._id||i}><img src={s.imageUrl||serviceImgs[i%8]}/>{s.category&&<span className="serviceCategoryTag">{s.category}</span>}<h3>{s.name}</h3><p>{s.description}</p><div className="servicePriceRow"><span className="servicePrice"><IndianRupee size={16}/>{Number(s.price||0).toLocaleString('en-IN')}</span>{s.duration&&<span className="serviceDuration"><Clock size={14}/> {s.duration}</span>}</div><button><ArrowRight/> Book Now</button></Link>)}</div>}</></PageTitle>}
function PageTitle({title,sub,children}){return <main className="page"><div className="pagehead"><h1>{title}</h1><p>{sub}</p></div>{children}</main>}
function DoctorDetail(){const {id}=useParams();const x=useApi('/api/doctors/'+id);const d=x.data||{};const available=isDoctorAvailable(d);return <main className="profilePage"><div className="profileTop"><Link to="/doctors">← Back</Link><h2>Doctor Profile</h2><b><Star/> {d.rating||4.9}</b></div>{x.loading?<p>Loading...</p>:<><section className="profile"><div className="profileLeft"><img src={getDoctorImage(d,0)}/><div className="miniStats"><b><Heart/>98%<small>Success</small></b><b><GraduationCap/>15 Years<small>Experience</small></b><b><Users/>5500+<small>Patients</small></b></div></div><div className="profileInfo"><h1>{d.name}</h1><span className="special">⚡ {d.specialization}</span><div className="infoGrid"><div><GraduationCap/><span><b>Qualifications</b>{d.qualifications||'MBBS, MD'}</span></div><div><MapPin/><span><b>Location</b>{d.location||'Delhi'}</span></div><div><Clock/><span><b>Consultation Fee</b><strong>₹{getDoctorFee(d)}</strong></span></div><div><ShieldCheck/><span><b>Availability</b><strong className={available?'availText':'unavailText'}>{available?'Available':'Not Available'}</strong></span></div></div><div className="about"><h3>⚙ About Doctor</h3><p>{d.about||'Experienced specialist providing compassionate and evidence-based medical care.'}</p></div></div></section>{available?<Booking doctor={d}/>:<section className="booking"><div className="unavailableNotice"><ShieldCheck/> <span>{d.name} isn't accepting new appointments right now. Please check back later or choose another doctor.</span></div></section>}</>}</main>}
function loadRazorpay(){return new Promise(resolve=>{if(window.Razorpay)return resolve(true);const script=document.createElement('script');script.src='https://checkout.razorpay.com/v1/checkout.js';script.onload=()=>resolve(true);script.onerror=()=>resolve(false);document.body.appendChild(script)})}
function escapeHtml(v){return String(v??'-').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')||'-'}
function printSummary(title,rows){const win=window.open('','_blank','width=700,height=800');if(!win){toast.error('Please allow pop-ups to print the booking summary');return}const rowsHtml=rows.map(([label,value])=>`<tr><td class="label">${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`).join('');win.document.write(`<!DOCTYPE html><html><head><title>${escapeHtml(title)}</title><style>
body{font-family:Arial,Helvetica,sans-serif;padding:32px;color:#111827;max-width:640px;margin:0 auto}
.brand{font-size:22px;font-weight:700;color:#10c979;margin-bottom:2px}
h1{font-size:18px;margin:16px 0 4px}
.sub{color:#6b7280;margin-bottom:24px;font-size:13px}
table{width:100%;border-collapse:collapse}
td{padding:10px 0;border-bottom:1px solid #e5e7eb;vertical-align:top;font-size:14px}
td.label{color:#6b7280;width:180px;font-weight:600}
.footer{margin-top:28px;font-size:12px;color:#9ca3af}
@media print{body{padding:0}}
</style></head><body><div class="brand">Satya-Hospital+</div><h1>${escapeHtml(title)}</h1><p class="sub">Please keep this for your records</p><table>${rowsHtml}</table><p class="footer">Generated on ${new Date().toLocaleString()}</p></body></html>`);win.document.close();win.focus();setTimeout(()=>win.print(),250)}
const patientFormFromSession=(patient,extra={})=>({name:patient?.name||'',age:patient?.age?String(patient.age):'',mobile:patient?.phone||'',gender:patient?.gender||'Male',email:patient?.email||'',...extra});
function Booking({doctor}){const navigate=useNavigate();const patient=usePatientSession();const [form,setForm]=useState(()=>patientFormFromSession(patient,{problem:''}));const [time,setTime]=useState('10:00 AM');const [paymentMethod,setPaymentMethod]=useState('online');const [busy,setBusy]=useState(false);const tomorrow=new Date();tomorrow.setDate(tomorrow.getDate()+1);const [date,setDate]=useState(tomorrow);const [calendarOpen,setCalendarOpen]=useState(false);const minDate=new Date();minDate.setHours(0,0,0,0);const maxDate=new Date();maxDate.setFullYear(maxDate.getFullYear()+1);const toInputDate=d=>{const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${day}`};const selectDate=e=>{if(!e.target.value)return;const [y,m,d]=e.target.value.split('-').map(Number);setDate(new Date(y,m-1,d));setCalendarOpen(false)};const change=e=>setForm({...form,[e.target.name]:e.target.value});useEffect(()=>{if(!patient)return;setForm(f=>({...f,name:f.name||patient.name||'',mobile:f.mobile||patient.phone||'',email:f.email||patient.email||'',age:f.age||(patient.age?String(patient.age):''),gender:f.gender&&f.gender!=='Male'?f.gender:(patient.gender||f.gender)}))},[patient]);
const printBooking=()=>{printSummary('Appointment Summary',[['Patient Name',form.name],['Age',form.age],['Gender',form.gender],['Mobile',form.mobile],['Email',form.email],['Problem / Symptoms',form.problem],['Doctor',doctor.name],['Speciality',doctor.specialization],['Date',date.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})],['Time',time],['Consultation Fee',`₹${getDoctorFee(doctor)}`],['Payment Method',paymentMethod==='online'?'Online Payment':'Pay at Clinic']])};
const book=async()=>{if(busy)return;if(!form.name||!form.age||!form.mobile||!form.email||!form.problem.trim())return toast.error('Please fill all patient details, including the patient problem');if(!/^\d{10}$/.test(form.mobile.replace(/\D/g,'')))return toast.error('Enter a valid 10 digit mobile number');setBusy(true);try{const payload={patientname:form.name,age:Number(form.age),gender:form.gender,email:form.email,phone:form.mobile.replace(/\D/g,''),problem:form.problem.trim(),doctorname:doctor.name||'Doctor',specialization:doctor.specialization||'',appointmentdate:date.toISOString(),appointmenttime:time,status:'pending'};const r=await fetch(API+'/api/appointments',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const appointment=await r.json();if(!r.ok)throw Error(appointment.error||'Booking failed');if(paymentMethod==='cash'||Number(getDoctorFee(doctor))<=0){try{await fetch(API+'/api/payments/record-cash',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({appointmentId:appointment._id,amount:Number(getDoctorFee(doctor)),patientEmail:form.email,patientPhone:form.mobile,description:`Consultation with ${doctor.name||'Doctor'}`})})}catch{}toast.success('Appointment booked. Pay at the clinic.');printBooking();navigate('/appointments',{state:{tab:'doctors'}});return}
const loaded=await loadRazorpay();if(!loaded)throw Error('Payment window could not be loaded');const pr=await fetch(API+'/api/payments/create-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({appointmentId:appointment._id,amount:Number(getDoctorFee(doctor)),patientEmail:form.email,patientPhone:form.mobile,description:`Consultation with ${doctor.name||'Doctor'}`})});const orderData=await pr.json();if(!pr.ok)throw Error(orderData.error||'Unable to start payment');
const rz=new window.Razorpay({key:orderData.keyId,amount:orderData.order.amount,currency:orderData.order.currency,name:'Satya-Hospital+',description:`Appointment - ${doctor.name||'Doctor'}`,order_id:orderData.order.id,prefill:{name:form.name,email:form.email,contact:form.mobile},theme:{color:'#10c979'},handler:async response=>{try{const vr=await fetch(API+'/api/payments/verify-payment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(response)});const verified=await vr.json();if(!vr.ok||!verified.success)throw Error(verified.error||'Payment verification failed');toast.success('Payment successful. Appointment confirmed!');printBooking();navigate('/appointments',{state:{tab:'doctors'}})}catch(e){toast.error(e.message)}},modal:{ondismiss:()=>toast('Payment cancelled. Appointment remains pending.')}});rz.open()}catch(e){toast.error(e.message)}finally{setBusy(false)}};
return <section className="booking"><h2><CalendarDays/> Book Your Appointment</h2><div className="bookingGrid"><div><h3>Select Date</h3><div className="calendarPicker"><button type="button" className="datePick" onClick={()=>setCalendarOpen(v=>!v)} title="Choose appointment date">{date.toLocaleDateString('en-US',{weekday:'short'})}<b>{date.getDate()}</b>{date.toLocaleDateString('en-US',{month:'short'})}<CalendarDays size={18}/></button>{calendarOpen&&<div className="calendarPopup"><label>Choose a specific date</label><input autoFocus type="date" value={toInputDate(date)} min={toInputDate(minDate)} max={toInputDate(maxDate)} onChange={selectDate}/><button type="button" className="calendarClose" onClick={()=>setCalendarOpen(false)}>Close</button></div>}</div><div className="patient"><h3>Patient Details</h3><input name="name" placeholder="Patient name" value={form.name} onChange={change}/><input name="age" type="number" min="1" max="120" placeholder="Age" value={form.age} onChange={change}/><input name="mobile" inputMode="numeric" maxLength="10" placeholder="Mobile number" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value.replace(/\D/g,'').slice(0,10)})}/><select name="gender" value={form.gender} onChange={change}><option>Male</option><option>Female</option><option>Other</option></select><input className="wide" name="email" type="email" placeholder="Email address" value={form.email} onChange={change}/><textarea className="wide patientProblem" name="problem" rows="4" maxLength="1000" placeholder="Describe the patient problem / symptoms" value={form.problem} onChange={change}/></div></div><div><h3>◷ Available Time Slots</h3><div className="slots">{['10:00 AM','11:00 AM','12:30 PM'].map(t=><button type="button" className={time===t?'selected':''} onClick={()=>setTime(t)} key={t}>{t}</button>)}</div><div className="summary"><p>Selected Doctor:<b>{doctor.name}</b></p><p>Doctor Speciality:<b>{doctor.specialization}</b></p><p>Selected Date:<b>{date.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</b></p><p>Selected Time:<b>{time}</b></p><p>Consultation Fee:<strong>₹{getDoctorFee(doctor)}</strong></p><h3>Payment Method</h3><div className="paymentMethods"><button type="button" className={paymentMethod==='online'?'selected':''} onClick={()=>setPaymentMethod('online')}><CreditCard/> Online Payment</button><button type="button" className={paymentMethod==='cash'?'selected':''} onClick={()=>setPaymentMethod('cash')}><Banknote/> Pay at Clinic</button></div><button className="btn full" disabled={busy} onClick={book}>{paymentMethod==='online'?<CreditCard/>:<Phone/>}{busy?'Processing...':paymentMethod==='online'?'Confirm & Pay':'Confirm Booking'}</button></div></div></div></section>}
function ServiceBooking({service}){const navigate=useNavigate();const patient=usePatientSession();const [form,setForm]=useState(()=>patientFormFromSession(patient));const [time,setTime]=useState('10:00 AM');const [paymentMethod,setPaymentMethod]=useState('online');const [busy,setBusy]=useState(false);const tomorrow=new Date();tomorrow.setDate(tomorrow.getDate()+1);const [date,setDate]=useState(tomorrow);const [calendarOpen,setCalendarOpen]=useState(false);const minDate=new Date();minDate.setHours(0,0,0,0);const maxDate=new Date();maxDate.setFullYear(maxDate.getFullYear()+1);const toInputDate=d=>{const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${day}`};const selectDate=e=>{if(!e.target.value)return;const [y,m,d]=e.target.value.split('-').map(Number);setDate(new Date(y,m-1,d));setCalendarOpen(false)};const change=e=>setForm({...form,[e.target.name]:e.target.value});useEffect(()=>{if(!patient)return;setForm(f=>({...f,name:f.name||patient.name||'',mobile:f.mobile||patient.phone||'',email:f.email||patient.email||'',age:f.age||(patient.age?String(patient.age):''),gender:f.gender&&f.gender!=='Male'?f.gender:(patient.gender||f.gender)}))},[patient]);
const printBooking=()=>{printSummary('Service Appointment Summary',[['Patient Name',form.name],['Age',form.age],['Gender',form.gender],['Mobile',form.mobile],['Email',form.email],['Service',service.name],['Category',service.category||'Diagnostic'],['Date',date.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})],['Time',time],['Service Fee',`₹${service.price||0}`],['Payment Method',paymentMethod==='online'?'Online Payment':'Pay at Clinic / Lab']])};
const book=async()=>{if(busy)return;if(!form.name||!form.age||!form.mobile||!form.email)return toast.error('Please fill all patient details');if(!/^\d{10}$/.test(form.mobile.replace(/\D/g,'')))return toast.error('Enter a valid 10 digit mobile number');setBusy(true);try{const payload={patientname:form.name,age:Number(form.age),gender:form.gender,email:form.email,phone:form.mobile.replace(/\D/g,''),servicename:service.name||'Diagnostic Service',category:service.category||'Diagnostic',appointmentdate:date.toISOString(),appointmenttime:time,price:Number(service.price||0),status:'pending'};const r=await fetch(API+'/api/service-appointments',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const appointment=await r.json();if(!r.ok)throw Error(appointment.error||'Service booking failed');if(paymentMethod==='cash'||Number(service.price||0)<=0){try{await fetch(API+'/api/payments/record-cash',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({serviceAppointmentId:appointment._id,amount:Number(service.price||0),patientEmail:form.email,patientPhone:form.mobile,description:`${service.name||'Diagnostic service'} booking`})})}catch{}toast.success('Service appointment booked. Pay at the clinic/lab.');printBooking();navigate('/appointments',{state:{tab:'services'}});return}const loaded=await loadRazorpay();if(!loaded)throw Error('Payment window could not be loaded');const pr=await fetch(API+'/api/payments/create-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({serviceAppointmentId:appointment._id,amount:Number(service.price||0),patientEmail:form.email,patientPhone:form.mobile,description:`${service.name||'Diagnostic service'} booking`})});const orderData=await pr.json();if(!pr.ok)throw Error(orderData.error||'Unable to start payment');const rz=new window.Razorpay({key:orderData.keyId,amount:orderData.order.amount,currency:orderData.order.currency,name:'Satya-Hospital+',description:`Service - ${service.name||'Diagnostic'}`,order_id:orderData.order.id,prefill:{name:form.name,email:form.email,contact:form.mobile},theme:{color:'#10c979'},handler:async response=>{try{const vr=await fetch(API+'/api/payments/verify-payment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(response)});const verified=await vr.json();if(!vr.ok||!verified.success)throw Error(verified.error||'Payment verification failed');toast.success('Payment successful. Service appointment confirmed!');printBooking();navigate('/appointments',{state:{tab:'services'}})}catch(e){toast.error(e.message)}},modal:{ondismiss:()=>toast('Payment cancelled. Service appointment remains pending.')}});rz.open()}catch(e){toast.error(e.message)}finally{setBusy(false)}};
return <section className="booking"><h2><CalendarDays/> Book Your Service Appointment</h2><div className="bookingGrid"><div><h3>Select Date</h3><div className="calendarPicker"><button type="button" className="datePick" onClick={()=>setCalendarOpen(v=>!v)}>{date.toLocaleDateString('en-US',{weekday:'short'})}<b>{date.getDate()}</b>{date.toLocaleDateString('en-US',{month:'short'})}<CalendarDays size={18}/></button>{calendarOpen&&<div className="calendarPopup"><label>Choose a specific date</label><input autoFocus type="date" value={toInputDate(date)} min={toInputDate(minDate)} max={toInputDate(maxDate)} onChange={selectDate}/><button type="button" className="calendarClose" onClick={()=>setCalendarOpen(false)}>Close</button></div>}</div><div className="patient"><h3>Patient Details</h3><input name="name" placeholder="Patient name" value={form.name} onChange={change}/><input name="age" type="number" min="1" max="120" placeholder="Age" value={form.age} onChange={change}/><input name="mobile" inputMode="numeric" maxLength="10" placeholder="Mobile number" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value.replace(/\D/g,'').slice(0,10)})}/><select name="gender" value={form.gender} onChange={change}><option>Male</option><option>Female</option><option>Other</option></select><input className="wide" name="email" type="email" placeholder="Email address" value={form.email} onChange={change}/></div></div><div><h3>◷ Available Time Slots</h3><div className="slots">{['10:00 AM','11:00 AM','12:30 PM'].map(t=><button type="button" className={time===t?'selected':''} onClick={()=>setTime(t)} key={t}>{t}</button>)}</div><div className="summary"><p>Selected Service:<b>{service.name}</b></p><p>Service Category:<b>{service.category||'Diagnostic'}</b></p><p>Selected Date:<b>{date.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</b></p><p>Selected Time:<b>{time}</b></p><p>Service Fee:<strong>₹{service.price||0}</strong></p><h3>Payment Method</h3><div className="paymentMethods"><button type="button" className={paymentMethod==='online'?'selected':''} onClick={()=>setPaymentMethod('online')}><CreditCard/> Online Payment</button><button type="button" className={paymentMethod==='cash'?'selected':''} onClick={()=>setPaymentMethod('cash')}><Banknote/> Pay at Clinic / Lab</button></div><button className="btn full" disabled={busy} onClick={book}>{paymentMethod==='online'?<CreditCard/>:<Banknote/>}{busy?'Processing...':paymentMethod==='online'?'Confirm & Pay':'Confirm Booking'}</button></div></div></div></section>}
function ServiceDetail(){const {id}=useParams();const x=useApi('/api/services/'+id),s=x.data||{};return <main className="profilePage"><div className="profileTop"><Link to="/services">← Back</Link><h2>Service Details</h2><b><Star/> {s.rating||4.8}</b></div><section className="profile serviceDetail"><div className="profileLeft"><img src={s.imageUrl||S1}/></div><div className="profileInfo"><h1>{s.name}</h1><span className="special">{s.category||'Diagnostic'}</span><div className="about"><h3>About Service</h3><p>{s.description}</p></div><div className="infoGrid"><div><Clock/><span><b>Duration</b>{s.duration||'30 minutes'}</span></div><div><ShieldCheck/><span><b>Availability</b>{s.availability||'Available'}</span></div></div><h2>₹{s.price||0}</h2></div></section>{!x.loading&&s.name&&<ServiceBooking service={s}/>}</main>}
function Appointments(){
  const location=useLocation();
  const [doctorAppointments,setDoctorAppointments]=useState([]);const [serviceAppointments,setServiceAppointments]=useState([]);const [activeTab,setActiveTab]=useState(location.state?.tab==='services'?'services':'doctors');const [loading,setLoading]=useState(true);const [clearing,setClearing]=useState(false);const [speakingId,setSpeakingId]=useState(null);const [briefLanguages,setBriefLanguages]=useState({});const [regenerating,setRegenerating]=useState(null);
  useEffect(()=>{if(location.state?.tab)setActiveTab(location.state.tab)},[location.state]);
  const languageInfo={english:{label:'English',lang:'en-IN',field:'aiBrief',englishName:'English'},telugu:{label:'తెలుగు',lang:'te-IN',field:'aiBriefTelugu',englishName:'Telugu'},hindi:{label:'हिन्दी',lang:'hi-IN',field:'aiBriefHindi',englishName:'Hindi'}};
  const voicesCacheRef=useRef([]);
  const resumeTimerRef=useRef(null);
  const speakTokenRef=useRef(0);
  const audioRef=useRef(null);
  // Chrome loads voices asynchronously - the first call to getVoices() often
  // returns an empty list. Wait for 'voiceschanged' (with a timeout fallback).
  // Only used for the offline fallback voice, since the Edge TTS backend is primary now.
  const getVoicesAsync=()=>new Promise(resolve=>{
    const existing=window.speechSynthesis.getVoices();
    if(existing.length){resolve(existing);return}
    let done=false;
    const finish=()=>{if(done)return;done=true;window.speechSynthesis.removeEventListener('voiceschanged',finish);resolve(window.speechSynthesis.getVoices())};
    window.speechSynthesis.addEventListener('voiceschanged',finish);
    setTimeout(finish,1000);
  });
  const stopSpeaking=()=>{
    speakTokenRef.current++;
    if('speechSynthesis' in window)window.speechSynthesis.cancel();
    if(audioRef.current){try{audioRef.current.pause()}catch{}audioRef.current=null}
    if(resumeTimerRef.current){clearInterval(resumeTimerRef.current);resumeTimerRef.current=null}
    setSpeakingId(null);
  };
  const getLanguage=a=>briefLanguages[a._id]||'english';
  const setLanguage=(id,lang)=>{stopSpeaking();setBriefLanguages(x=>({...x,[id]:lang}))};
  const getBrief=(a,lang=getLanguage(a))=>a?.[languageInfo[lang].field]||'';
  // Normalize lang tags so 'te_IN', 'te-in', 'TE-IN' etc. all compare equal.
  const normalizeLang=l=>String(l||'').toLowerCase().replace(/_/g,'-');
  const findLocalVoice=(voices,targetLang,englishName)=>{
    const target=normalizeLang(targetLang);
    const base=target.split('-')[0];
    return voices.find(v=>normalizeLang(v.lang)===target)
      ||voices.find(v=>normalizeLang(v.lang)===base||normalizeLang(v.lang).startsWith(base+'-'))
      ||voices.find(v=>v.name.toLowerCase().includes(englishName.toLowerCase()));
  };
  const edgeTTSUrl=(text,lang)=>`${API}/api/tts?lang=${encodeURIComponent(lang)}&text=${encodeURIComponent(text)}`;
  // Offline/last-resort fallback: the device's own installed voice, if any.
  // Only reached if the backend's TTS service can't be reached (e.g. no internet).
  const speakWithLocalVoice=async(appointment,lang,brief,targetLang,myToken)=>{
    if(!('speechSynthesis' in window)){toast.error('Voice playback failed and no offline voice is available in this browser.');return}
    const voices=voicesCacheRef.current.length?voicesCacheRef.current:await getVoicesAsync();
    voicesCacheRef.current=voices;
    if(myToken!==speakTokenRef.current)return;
    const voice=findLocalVoice(voices,targetLang,languageInfo[lang].englishName);
    if(!voice&&lang!=='english'){
      toast.error(`Couldn't reach the online voice service, and no ${languageInfo[lang].label} voice is installed on this device.`,{duration:6000});
      stopSpeaking();
      return;
    }
    const chunks=brief.match(/[^.!?।॥]+[.!?।॥]*/g)?.map(s=>s.trim()).filter(Boolean)||[brief];
    const speakChunk=(i)=>{
      if(myToken!==speakTokenRef.current)return;
      if(i>=chunks.length){stopSpeaking();return}
      const utterance=new SpeechSynthesisUtterance(chunks[i]);
      utterance.lang=targetLang;utterance.rate=0.9;utterance.pitch=1;utterance.volume=1;
      if(voice)utterance.voice=voice;
      utterance.onend=()=>speakChunk(i+1);
      utterance.onerror=(e)=>{
        if(myToken!==speakTokenRef.current)return;
        if(e.error==='canceled'||e.error==='interrupted')return;
        stopSpeaking();
        toast.error(`Voice playback failed (${e.error||'unknown error'}).`);
      };
      window.speechSynthesis.speak(utterance);
    };
    resumeTimerRef.current=setInterval(()=>{if(window.speechSynthesis.speaking)window.speechSynthesis.resume()},10000);
    speakChunk(0);
  };
  // Primary engine: Microsoft Edge's neural text-to-speech service (via our
  // own backend), using a dedicated male voice per language. It handles the
  // whole brief in a single request, so no chunking is needed here.
  const playEdgeTTS=(appointment,lang,brief,targetLang,myToken)=>{
    const audio=new Audio(edgeTTSUrl(brief,lang));
    audioRef.current=audio;
    audio.onended=()=>{if(myToken===speakTokenRef.current)stopSpeaking()};
    audio.onerror=()=>{
      if(myToken!==speakTokenRef.current)return;
      speakWithLocalVoice(appointment,lang,brief,targetLang,myToken);
    };
    audio.play().catch(()=>{
      if(myToken!==speakTokenRef.current)return;
      speakWithLocalVoice(appointment,lang,brief,targetLang,myToken);
    });
  };
  const speakBrief=(appointment)=>{
    const lang=getLanguage(appointment);
    const brief=String(getBrief(appointment,lang)).trim();
    if(!brief){toast.error(`${languageInfo[lang].label} AI brief is unavailable`);return}
    stopSpeaking();
    const myToken=speakTokenRef.current;
    setSpeakingId(appointment._id);
    playEdgeTTS(appointment,lang,brief,languageInfo[lang].lang,myToken);
  };
  const loadAppointments=async()=>{setLoading(true);try{const [dr,sr]=await Promise.all([fetch(API+'/api/appointments'),fetch(API+'/api/service-appointments')]);const [doctors,services]=await Promise.all([dr.json(),sr.json()]);if(!dr.ok)throw Error(doctors.error||'Could not load doctor appointments');if(!sr.ok)throw Error(services.error||'Could not load service appointments');const sortNewest=list=>[...(Array.isArray(list)?list:[])].sort((a,b)=>new Date(b.createdAt||b.appointmentdate)-new Date(a.createdAt||a.appointmentdate));setDoctorAppointments(sortNewest(doctors));setServiceAppointments(sortNewest(services))}catch(e){toast.error(e.message);setDoctorAppointments([]);setServiceAppointments([])}finally{setLoading(false)}};
  useEffect(()=>{loadAppointments();return()=>stopSpeaking()},[]);
  const appointments=activeTab==='doctors'?doctorAppointments:serviceAppointments;
  const regenerate=async a=>{setRegenerating(a._id);stopSpeaking();const isServiceTab=activeTab==='services';try{const url=isServiceTab?`${API}/api/service-appointments/${a._id}/regenerate-ai-brief`:`${API}/api/appointments/${a._id}/regenerate-ai-brief`;const r=await fetch(url,{method:'POST'});const updated=await r.json();if(!r.ok)throw Error(updated.details||updated.error||'Could not generate multilingual brief');if(isServiceTab)setServiceAppointments(list=>list.map(x=>x._id===updated._id?updated:x));else setDoctorAppointments(list=>list.map(x=>x._id===updated._id?updated:x));toast.success('English, Telugu and Hindi briefs generated')}catch(e){toast.error(e.message)}finally{setRegenerating(null)}};
  const clearAll=async()=>{if(!appointments.length||clearing)return;const isDoctors=activeTab==='doctors';const label=isDoctors?'doctor':'service';if(!window.confirm(`Clear all ${label} appointments? This cannot be undone.`))return;setClearing(true);try{const r=await fetch(API+(isDoctors?'/api/appointments/clear-all':'/api/service-appointments/clear-all'),{method:'DELETE'});if(!r.ok)throw Error(`Could not clear ${label} appointments`);if(isDoctors)setDoctorAppointments([]);else setServiceAppointments([]);toast.success(`${isDoctors?'Doctor':'Service'} appointments cleared`)}catch(e){toast.error(e.message)}finally{setClearing(false)}};
  return <PageTitle title="My Appointments" sub="View and manage your medical and diagnostic appointments."><div className="appointmentTabs"><button className={activeTab==='doctors'?'active':''} onClick={()=>setActiveTab('doctors')}>Doctors Appointments <span>{doctorAppointments.length}</span></button><button className={activeTab==='services'?'active':''} onClick={()=>setActiveTab('services')}>Services Appointments <span>{serviceAppointments.length}</span></button></div><div className="appointmentActions">{appointments.length>0&&<button className="clearAllBtn" onClick={clearAll} disabled={clearing}><Trash2 size={18}/>{clearing?'Clearing...':`Clear ${activeTab==='doctors'?'Doctor':'Service'} Appointments`}</button>}</div>{loading?<div className="appointmentEmpty"><p>Loading appointments...</p></div>:appointments.length===0?<div className="appointmentEmpty"><CalendarDays size={52}/><h2>No {activeTab==='doctors'?'doctor':'service'} appointments yet</h2><p>{activeTab==='doctors'?'Book a doctor appointment and it will appear in this tab.':'Book a diagnostic service and it will appear in this tab.'}</p><Link className="btn" to={activeTab==='doctors'?'/doctors':'/services'}>{activeTab==='doctors'?'Book Doctor Appointment':'Book Service'}</Link></div>:<div className="appointmentList">{appointments.map((a,index)=>{const lang=getLanguage(a);const brief=getBrief(a,lang);const hasAll=a.aiBrief&&a.aiBriefTelugu&&a.aiBriefHindi;return <div key={a._id} className={index===0?'latestAppointment':''}><CalendarDays/><div className="appointmentDetails"><h3>{activeTab==='services'?a.servicename:a.doctorname}</h3><p><b>{activeTab==='services'?'Service Category':'Speciality'}:</b> {activeTab==='services'?(a.category||'Diagnostic'):(a.specialization||'—')}<br/><b>Date:</b> {new Date(a.appointmentdate).toLocaleDateString()} • {a.appointmenttime}{activeTab==='services'&&<><br/><b>Service Fee:</b> ₹{a.price||0}</>}</p><div className="appointmentPatient"><strong>Patient Details</strong><span><b>Name:</b> {a.patientname||'—'}</span><span><b>Age:</b> {a.age||'—'}</span><span><b>Gender:</b> {a.gender||'—'}</span><span><b>Mobile:</b> {a.phone||'—'}</span><span className="patientEmail"><b>Email:</b> {a.email||'—'}</span><>{activeTab==='doctors'&&<span className="patientProblemDisplay"><b>Patient Problem:</b> {a.problem||'—'}</span>}<span className="patientAiBrief"><b>{activeTab==='doctors'?'AI Problem Brief':'AI Service Brief'}</b><span className="aiLanguageTabs">{Object.entries(languageInfo).map(([key,x])=><button type="button" key={key} className={lang===key?'active':''} onClick={()=>setLanguage(a._id,key)}>{x.label}</button>)}</span><span className="aiBriefText">{brief||`${languageInfo[lang].label} brief is not available for this appointment.`}</span>{!hasAll&&<button type="button" className="generateLanguagesBtn" disabled={regenerating===a._id} onClick={()=>regenerate(a)}>{regenerating===a._id?'Generating 3 languages...':'Generate English + Telugu + Hindi'}</button>}{brief&&<span className="aiVoiceControls">{speakingId===a._id?<button type="button" className="aiVoiceBtn stop" onClick={stopSpeaking}><Square size={16}/> Stop Voice</button>:<button type="button" className="aiVoiceBtn" onClick={()=>speakBrief(a)}><Volume2 size={17}/> Listen in {languageInfo[lang].label}</button>}</span>}<small className="voiceNote">Voice uses a male neural voice via our server (needs an internet connection); if that's unavailable it falls back to your device's own voice.</small></span></></div>{index===0&&<small className="latestLabel">Latest appointment</small>}</div><span className="appointmentStatus">{a.status}</span></div>})}</div>}</PageTitle>
}
function Contact(){return <PageTitle title="Contact Us" sub="We are here to help you with your healthcare needs."><div className="contact"><div><h2>Get in Touch</h2><p><Phone/> +91 9515193331</p><p><Mail/> satvikkalasapudi@gmail.com</p><p><MapPin/> Hyderabad, India</p></div><form onSubmit={e=>{e.preventDefault();toast.success('Message sent')}}><input placeholder="Your name"/><input placeholder="Email address"/><textarea rows="6" placeholder="Your message"></textarea><button className="btn">Send Message</button></form></div></PageTitle>}
function Signup(){
  const navigate=useNavigate();
  const [form,setForm]=useState({name:'',email:'',phone:'',age:'',gender:'',password:'',confirm:''});
  const [busy,setBusy]=useState(false);
  const [showPw,setShowPw]=useState(false);
  const [showConfirmPw,setShowConfirmPw]=useState(false);
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const submit=e=>{
    e.preventDefault();
    if(!form.name||!form.email||!form.phone||!form.password){toast.error('Please fill all required fields');return}
    if(form.password.length<6){toast.error('Password must be at least 6 characters');return}
    if(form.password!==form.confirm){toast.error('Passwords do not match');return}
    const users=getUsers();
    if(users.some(u=>u.email.toLowerCase()===form.email.trim().toLowerCase())){toast.error('An account with this email already exists');return}
    setBusy(true);
    saveUsers([...users,{name:form.name.trim(),email:form.email.trim(),phone:form.phone.trim(),age:form.age,gender:form.gender,password:form.password}]);
    toast.success('Account created! Redirecting to sign in...');
    setTimeout(()=>navigate('/login',{state:{email:form.email.trim()}}),900);
  };
  return <main className="loginSplit signupSplit">
    <div className="loginSplitImage" style={{backgroundImage:`url(${SignupBg})`}}>
      <img src={logo} className="loginPinBadge"/>
      <div className="loginLeftContent">
        <div className="loginBrandCentered">
          <img src={logo} className="loginBadge"/>
          <h1>Satya-Hospital</h1>
          <div className="goldRule"><span></span><i></i><span></span></div>
          <p className="loginTag">CARE &nbsp;•&nbsp; COMPASSION &nbsp;•&nbsp; COMMITMENT</p>
        </div>
        <blockquote className="loginQuote2">&ldquo;Begin your journey to better health&rdquo;</blockquote>
        <p className="loginSub2">Join Satya-Hospital and manage your care with ease.</p>
        <div className="loginFeatures">
          <div><UserPlus/><b>Quick Registration</b><small>Create your account in minutes.</small></div>
          <div><ShieldCheck/><b>Secure &amp; Private</b><small>Your data is safe with us.</small></div>
          <div><CalendarDays/><b>Easy Booking</b><small>Book appointments anytime.</small></div>
          <div><HeartPulse/><b>Personalized Care</b><small>Tailored to your health needs.</small></div>
        </div>
      </div>
    </div>
    <div className="loginSplitForm">
      <div className="loginBrand">
        <img src={logo} className="loginBadge small"/>
        <h1>Satya-Hospital</h1>
        <div className="goldRule"><span></span><i></i><span></span></div>
        <p>Create Your Patient Account</p>
      </div>
      <h3 className="loginFormTitle">Patient Sign Up</h3>
      <form className="splitForm signupForm" onSubmit={submit}>
        <label>Full Name</label>
        <div className="inputWrap"><User size={16}/><input placeholder="Enter your full name" value={form.name} onChange={set('name')} required/></div>
        <label>Email Address</label>
        <div className="inputWrap"><Mail size={16}/><input type="email" placeholder="Enter your email" value={form.email} onChange={set('email')} required/></div>
        <label>Phone Number</label>
        <div className="inputWrap"><Phone size={16}/><input placeholder="Enter your phone number" value={form.phone} onChange={set('phone')} required/></div>
        <div className="signupRow">
          <div><label>Age</label><div className="inputWrap"><input placeholder="Age" value={form.age} onChange={set('age')}/></div></div>
          <div><label>Gender</label><div className="inputWrap"><select value={form.gender} onChange={set('gender')}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div></div>
        </div>
        <div className="signupRow">
          <div>
            <label>Password</label>
            <div className="inputWrap"><Lock size={16}/><input type={showPw?'text':'password'} placeholder="Min 6 characters" value={form.password} onChange={set('password')} required/><button type="button" className="pwToggle" onClick={()=>setShowPw(s=>!s)}>{showPw?<EyeOff size={16}/>:<Eye size={16}/>}</button></div>
          </div>
          <div>
            <label>Confirm Password</label>
            <div className="inputWrap"><Lock size={16}/><input type={showConfirmPw?'text':'password'} placeholder="Re-enter password" value={form.confirm} onChange={set('confirm')} required/><button type="button" className="pwToggle" onClick={()=>setShowConfirmPw(s=>!s)}>{showConfirmPw?<EyeOff size={16}/>:<Eye size={16}/>}</button></div>
          </div>
        </div>
        <button className="splitBtn" disabled={busy}><BadgeCheck size={18}/> {busy?'Creating Account...':'Create Account'}</button>
        <p className="splitFoot">Already have an account? <Link to="/login">Sign in</Link></p>
      </form>
    </div>
  </main>
}
// Admin-only header: logo + brand on the left, Home / Doctors / Payments tabs
// in the middle, and a "Hi, {admin}" + Sign Out pill on the right — mirrors
// the look of the public site header.
function AdminHeaderNav({admin,onSignOut,onRefresh}){
  const [open,setOpen]=useState(false);
  const firstName=(admin.email||'Admin').split('@')[0];
  return <header className="header adminHeaderBar">
    <Link className="logo" to="/admin"><img src={logo}/><span><b>Satya-Hospital</b><small>Admin Dashboard</small></span></Link>
    <nav className={open?'open':''}>
      <NavLink to="/admin" end onClick={()=>setOpen(false)}>Home</NavLink>
      <NavLink to="/admin/doctors" onClick={()=>setOpen(false)}>Doctors</NavLink>
      <NavLink to="/admin/payments" onClick={()=>setOpen(false)}>Payments</NavLink>
      <div className="navAuth">
        <button type="button" className="adminRefreshBtn" onClick={onRefresh} title="Refresh data"><RefreshCw size={16}/></button>
        <span className="adminNav">Hi, {firstName}</span>
        <button className="login" onClick={onSignOut}>Sign Out</button>
      </div>
    </nav>
    <button className="hamb" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
  </header>
}

function AdminHome({data,loading,revenue,updateStatus,deleteDoctor}){
  return <main className="adminPage">
    <div className="adminHeading"><div><span>SATYA-HOSPITALS ADMIN</span><h1>Dashboard</h1><p>Overview of doctors, appointments, services and payments.</p></div></div>
    <div className="adminStats"><div><Stethoscope/><span><b>{data.doctors.length}</b>Doctors</span></div><div><CalendarDays/><span><b>{data.appointments.length+data.serviceAppointments.length}</b>Appointments</span></div><div><Activity/><span><b>{data.services.length}</b>Services</span></div><div><IndianRupee/><span><b>₹{revenue.toLocaleString('en-IN')}</b>Collected</span></div></div>
    {loading?<div className="adminPanel">Loading dashboard...</div>:<>
    <section className="adminPanel"><div className="panelTitle"><h2>Recent Appointments</h2><span>{data.appointments.length} total</span></div><div className="adminTableWrap"><table className="adminTable"><thead><tr><th>Patient</th><th>Doctor</th><th>Date / Time</th></tr></thead><tbody>{data.appointments.slice().reverse().slice(0,10).map(a=><tr key={a._id}><td><b>{a.patientname||'Patient'}</b><small>{a.email}</small></td><td>{a.doctorname}</td><td>{a.appointmentdate?new Date(a.appointmentdate).toLocaleDateString('en-IN'):''}<small>{a.appointmenttime}</small></td></tr>)}</tbody></table></div></section>
    <section className="adminPanel"><div className="panelTitle"><h2>Doctors</h2><Link className="btn" to="/admin/doctors">Manage appointments</Link></div><div className="adminDoctorGrid">{data.doctors.map((d,i)=><div className="adminDoctor" key={d._id}><img src={getDoctorImage(d,i)}/><div><b>{d.name}</b><small>{d.specialization}</small><span>₹{getDoctorFee(d)}</span></div><button title="Delete doctor" onClick={()=>deleteDoctor(d._id)}><Trash2 size={18}/></button></div>)}</div></section></>}
  </main>
}

// Small collapsible "Add Doctor" form shown at the top of the admin
// Doctors page. Posts straight to /api/doctors and refreshes the list.
function AddDoctorForm({addDoctor}){
  const empty={name:'',email:'',phone:'',specialization:'',experience:'',qualifications:'',location:'',about:'',fee:'',rating:'',imageUrl:'',availability:'Available'};
  const [open,setOpen]=useState(false);
  const [form,setForm]=useState(empty);
  const [busy,setBusy]=useState(false);
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const submit=async e=>{
    e.preventDefault();
    if(!form.name||!form.email||!form.phone||!form.specialization||!form.fee){toast.error('Please fill name, email, phone, specialization and fee');return}
    setBusy(true);
    const ok=await addDoctor({...form,fee:Number(form.fee)||0,rating:form.rating===''?0:Number(form.rating)});
    setBusy(false);
    if(ok){setForm(empty);setOpen(false)}
  };
  return <section className="adminPanel addDoctorPanel">
    <button type="button" className="addDoctorToggle" onClick={()=>setOpen(o=>!o)}>
      <span><UserPlus size={18}/> Add Doctor</span>
      <ChevronDown className={open?'chevOpen':''}/>
    </button>
    {open&&<form className="addDoctorForm" onSubmit={submit}>
      <input placeholder="Full Name *" value={form.name} onChange={set('name')}/>
      <input placeholder="Specialization *" value={form.specialization} onChange={set('specialization')}/>
      <input type="email" placeholder="Email *" value={form.email} onChange={set('email')}/>
      <input placeholder="Phone *" value={form.phone} onChange={set('phone')}/>
      <input placeholder="Experience (e.g. 8 years)" value={form.experience} onChange={set('experience')}/>
      <input placeholder="Qualifications (e.g. MBBS, MD)" value={form.qualifications} onChange={set('qualifications')}/>
      <input placeholder="Location" value={form.location} onChange={set('location')}/>
      <input placeholder="Image URL" value={form.imageUrl} onChange={set('imageUrl')}/>
      <input type="number" min="0" placeholder="Consultation Fee (₹) *" value={form.fee} onChange={set('fee')}/>
      <input type="number" min="0" max="5" step="0.1" placeholder="Rating" value={form.rating} onChange={set('rating')}/>
      <select value={form.availability} onChange={set('availability')}>
        <option value="Available">Available</option>
        <option value="Unavailable">Unavailable</option>
      </select>
      <textarea className="wide" placeholder="About the doctor" rows="3" value={form.about} onChange={set('about')}/>
      <button type="submit" className="btn wide" disabled={busy}>{busy?'Adding...':'Add Doctor'}</button>
    </form>}
  </section>
}

// Doctors tab: per-doctor booked / pending / completed counts, with an
// expandable list of that doctor's appointments (patient + problem) and a
// Complete button. Completing an appointment PUTs the new status to the
// backend, so it is reflected here and on the patient's Appointments page
// the next time either page loads.
function AdminDoctors({data,loading,updateStatus,updateDoctor,addDoctor}){
  const [expanded,setExpanded]=useState(null);
  const groups=data.doctors.map(d=>{
    const appts=data.appointments.filter(a=>a.doctorname===d.name);
    return {
      doctor:d,
      appts,
      booked:appts.length,
      pending:appts.filter(a=>a.status==='pending').length,
      completed:appts.filter(a=>a.status==='completed').length,
    };
  });
  return <main className="adminPage">
    <div className="adminHeading"><div><span>SATYA-HOSPITALS ADMIN</span><h1>Doctors</h1><p>Appointment load and patient details per doctor.</p></div></div>
    <AddDoctorForm addDoctor={addDoctor}/>
    {loading?<div className="adminPanel">Loading doctors...</div>:groups.length===0?<div className="adminPanel">No doctors found.</div>:
    <div className="doctorStatList">{groups.map(({doctor:d,appts,booked,pending,completed},i)=>{
      const isOpen=expanded===d._id;
      const isAvailable=(d.availability||'Available')!=='Unavailable';
      return <section className="adminPanel doctorStatCard" key={d._id}>
        <div className="doctorStatHead" role="button" tabIndex={0} onClick={()=>setExpanded(isOpen?null:d._id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' ')setExpanded(isOpen?null:d._id)}}>
          <img src={getDoctorImage(d,i)}/>
          <div className="doctorStatName"><b>{d.name}</b><small>{d.specialization}</small></div>
          <button type="button" className={'availabilityToggle '+(isAvailable?'is-available':'is-unavailable')} onClick={e=>{e.stopPropagation();updateDoctor(d._id,{availability:isAvailable?'Unavailable':'Available'})}} title="Click to toggle availability">
            <span className="availabilityDot"/>{isAvailable?'Available':'Not Available'}
          </button>
          <div className="doctorStatNums"><span><b>{booked}</b>Booked</span><span className="pendingNum"><b>{pending}</b>Pending</span><span className="completedNum"><b>{completed}</b>Completed</span></div>
          <ChevronDown className={isOpen?'chevOpen':''}/>
        </div>
        {isOpen&&<div className="doctorApptList">
          {appts.length===0?<p className="doctorApptEmpty">No appointments booked with this doctor yet.</p>:appts.slice().reverse().map(a=><div className="doctorApptCard" key={a._id}>
            <div className="doctorApptTop"><b>{a.patientname||'Patient'}</b><span className={'statusPill status-'+(a.status||'pending')}>{a.status||'pending'}</span></div>
            <p className="doctorApptMeta"><b>Age/Gender:</b> {a.age||'—'} / {a.gender||'—'} &nbsp;•&nbsp; <b>Phone:</b> {a.phone||'—'} &nbsp;•&nbsp; <b>Date:</b> {a.appointmentdate?new Date(a.appointmentdate).toLocaleDateString('en-IN'):'—'} {a.appointmenttime}</p>
            <p className="doctorApptProblem"><b>Problem:</b> {a.problem||'—'}</p>
            <div className="doctorApptActions">
              <label className="statusSelectLabel">Status:
                <select className="statusSelect" value={a.status||'pending'} onChange={e=>updateStatus(a._id,e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </label>
              {a.status!=='completed'&&<button type="button" className="completeBtn" onClick={()=>updateStatus(a._id,'completed')}><CheckCircle2 size={16}/> Mark Completed</button>}
            </div>
          </div>)}
        </div>}
      </section>
    })}</div>}
  </main>
}

// Payments tab: two sections — doctor consultation payments and diagnostic
// service payments. Every payment record already carries the method
// (online/cash) chosen at "Confirm Booking" / "Confirm & Pay" time, and is
// created automatically by the booking flow, so this page always reflects
// the latest state without any manual entry.
function AdminPayments({data,loading,markCollected}){
  const doctorPayments=data.payments.filter(p=>p.appointmentId).map(p=>({payment:p,appt:data.appointments.find(a=>a._id===p.appointmentId)})).sort((a,b)=>new Date(b.payment.createdAt)-new Date(a.payment.createdAt));
  const servicePayments=data.payments.filter(p=>p.serviceAppointmentId).map(p=>({payment:p,appt:data.serviceAppointments.find(a=>a._id===p.serviceAppointmentId)})).sort((a,b)=>new Date(b.payment.createdAt)-new Date(a.payment.createdAt));
  const totalOf=list=>list.filter(x=>x.payment.status==='completed'||x.payment.status==='captured'||x.payment.status==='paid').reduce((n,x)=>n+Number(x.payment.amount||0),0);
  const Row=({payment:p,appt,isService})=><tr key={p._id}>
    <td><b>{appt?.patientname||p.patientEmail||'Patient'}</b><small>{p.patientEmail}</small></td>
    <td>{isService?(appt?.servicename||'—'):(appt?.doctorname||'—')}<small>{isService?(appt?.category||'Diagnostic'):(appt?.problem||'')}</small></td>
    <td>₹{Number(p.amount||0).toLocaleString('en-IN')}</td>
    <td><span className={'methodPill method-'+(p.paymentMethod||'online')}>{p.paymentMethod==='cash'?<Banknote size={14}/>:<CreditCard size={14}/>}{p.paymentMethod==='cash'?'Cash':'Online'}</span></td>
    <td><span className={'statusPill status-'+(p.status||'pending')}>{p.status}</span></td>
    <td>{p.createdAt?new Date(p.createdAt).toLocaleString('en-IN'):'—'}</td>
    <td>{p.paymentMethod==='cash'&&p.status==='pending'&&<button type="button" className="markPaidBtn" onClick={()=>markCollected(p.paymentId)}>Mark Received</button>}</td>
  </tr>;
  return <main className="adminPage">
    <div className="adminHeading"><div><span>SATYA-HOSPITALS ADMIN</span><h1>Payments</h1><p>Every payment recorded automatically from patient bookings.</p></div></div>
    {loading?<div className="adminPanel">Loading payments...</div>:<>
    <section className="adminPanel">
      <div className="panelTitle"><h2><Wallet size={20}/> Doctors Payment</h2><span>{doctorPayments.length} bookings • ₹{totalOf(doctorPayments).toLocaleString('en-IN')} collected</span></div>
      <div className="adminTableWrap"><table className="adminTable"><thead><tr><th>Patient</th><th>Doctor / Problem</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th><th></th></tr></thead><tbody>
        {doctorPayments.length===0?<tr><td colSpan="7">No doctor payments yet.</td></tr>:doctorPayments.map(x=><Row key={x.payment._id} {...x} isService={false}/>)}
      </tbody></table></div>
    </section>
    <section className="adminPanel">
      <div className="panelTitle"><h2><Activity size={20}/> Services Payment</h2><span>{servicePayments.length} bookings • ₹{totalOf(servicePayments).toLocaleString('en-IN')} collected</span></div>
      <div className="adminTableWrap"><table className="adminTable"><thead><tr><th>Patient</th><th>Service</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th><th></th></tr></thead><tbody>
        {servicePayments.length===0?<tr><td colSpan="7">No service payments yet.</td></tr>:servicePayments.map(x=><Row key={x.payment._id} {...x} isService={true}/>)}
      </tbody></table></div>
    </section></>}
  </main>
}

function AdminDashboard(){
  const admin=useAdminSession();
  const navigate=useNavigate();
  const [data,setData]=useState({doctors:[],appointments:[],serviceAppointments:[],services:[],payments:[]});
  const [loading,setLoading]=useState(true);
  const [form,setForm]=useState({email:'',password:''});
  const [busy,setBusy]=useState(false);
  const refresh=async()=>{setLoading(true);try{const [d,a,sa,s,p]=await Promise.all([fetch(API+'/api/doctors'),fetch(API+'/api/appointments'),fetch(API+'/api/service-appointments'),fetch(API+'/api/services'),fetch(API+'/api/payments/all')]);const vals=await Promise.all([d.json(),a.json(),sa.json(),s.json(),p.json()]);const arr=x=>Array.isArray(x)?x:Array.isArray(x?.data)?x.data:Array.isArray(x?.payments)?x.payments:[];setData({doctors:arr(vals[0]),appointments:arr(vals[1]),serviceAppointments:arr(vals[2]),services:arr(vals[3]),payments:arr(vals[4])})}catch(e){toast.error('Could not load admin data')}finally{setLoading(false)}};
  useEffect(()=>{if(admin)refresh()},[admin]);
  const adminSignIn=e=>{
    e.preventDefault();
    if(!form.email||!form.password){toast.error('Enter admin email and password');return}
    setBusy(true);
    if(!checkAdminCredentials(form.email,form.password)){toast.error('Invalid admin credentials');setBusy(false);return}
    setAdminSession({email:form.email.trim()});
    toast.success('Welcome back, admin');
  };
  if(!admin)return <PageTitle title="Admin Sign In" sub="Sign in with your administrator email and password."><form className="loginBox" onSubmit={adminSignIn}><img src={logo}/><input type="email" placeholder="Admin Email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/><input type="password" placeholder="Admin Password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))}/><button className="btn full" disabled={busy}>{busy?'Signing in...':'Sign In'}</button></form></PageTitle>;
  const revenue=data.payments.filter(p=>p.status==='paid'||p.status==='captured'||p.status==='completed').reduce((n,p)=>n+Number(p.amount||0),0);
  const updateStatus=async(id,status)=>{try{const r=await fetch(API+'/api/appointments/'+id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({status})});if(!r.ok)throw Error();toast.success('Appointment updated');refresh()}catch{toast.error('Update failed')}};
  const deleteDoctor=async id=>{if(!confirm('Delete this doctor?'))return;try{const r=await fetch(API+'/api/doctors/'+id,{method:'DELETE'});if(!r.ok)throw Error();toast.success('Doctor deleted');refresh()}catch{toast.error('Delete failed')}};
  const updateDoctor=async(id,patch)=>{try{const r=await fetch(API+'/api/doctors/'+id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(patch)});if(!r.ok)throw Error();toast.success('Doctor updated');refresh()}catch{toast.error('Update failed')}};
  const addDoctor=async payload=>{try{const r=await fetch(API+'/api/doctors',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const j=await r.json();if(!r.ok)throw Error(j.error||'Could not add doctor');toast.success('Doctor added');refresh();return true}catch(e){toast.error(e.message);return false}};
  const markCollected=async paymentId=>{try{const r=await fetch(API+'/api/payments/mark-collected/'+paymentId,{method:'POST'});if(!r.ok)throw Error();toast.success('Payment marked as received');refresh()}catch{toast.error('Update failed')}};
  const signOut=()=>{clearAdminSession();toast.success('Signed out');navigate('/login',{state:{role:'admin'}})};
  return <>
    <AdminHeaderNav admin={admin} onSignOut={signOut} onRefresh={refresh}/>
    <Routes>
      <Route path="/" element={<AdminHome data={data} loading={loading} revenue={revenue} updateStatus={updateStatus} deleteDoctor={deleteDoctor}/>}/>
      <Route path="/doctors" element={<AdminDoctors data={data} loading={loading} updateStatus={updateStatus} updateDoctor={updateDoctor} addDoctor={addDoctor}/>}/>
      <Route path="/payments" element={<AdminPayments data={data} loading={loading} markCollected={markCollected}/>}/>
    </Routes>
  </>
}

function Scroll(){const [s,setS]=useState(false);useEffect(()=>{const f=()=>setS(scrollY>300);addEventListener('scroll',f);return()=>removeEventListener('scroll',f)},[]);return s?<button className="scroll" onClick={()=>scrollTo({top:0,behavior:'smooth'})}><ChevronUp/></button>:null}
function Root(){const patient=usePatientSession();return patient?<Home/>:<Login/>}
function AppShell(){
  const location=useLocation();
  const patient=usePatientSession();
  // Hide the site header/footer on the login page — both the dedicated
  // /login route and "/" when it's showing Login because no one's signed in.
  const isAdmin=location.pathname==='/admin'||location.pathname.startsWith('/admin/');
  const hideChrome=isAdmin||location.pathname==='/login'||location.pathname==='/signup'||(location.pathname==='/'&&!patient);
  const showFooter=location.pathname==='/'&&!!patient;
  return <>
    {!hideChrome&&<Header/>}
    <Routes><Route path="/" element={<Root/>}/><Route path="/doctors" element={<Doctors/>}/><Route path="/doctors/:id" element={<DoctorDetail/>}/><Route path="/services" element={<Services/>}/><Route path="/services/:id" element={<ServiceDetail/>}/><Route path="/appointments" element={<Appointments/>}/><Route path="/contact" element={<Contact/>}/><Route path="/login" element={<Login/>}/><Route path="/signup" element={<Signup/>}/><Route path="/admin/*" element={<AdminDashboard/>}/></Routes>
    {showFooter&&<Footer/>}
    <Scroll/><Toaster position="top-center"/>
  </>
}
function App(){return <BrowserRouter><AppShell/></BrowserRouter>};export default App;
