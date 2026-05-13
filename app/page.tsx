"use client";

import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";

type ServiceFilter = "all" | "dog" | "cat" | "care";

type ServiceCard = {
  title: string;
  price: string;
  description: string;
  image: string;
  alt: string;
  categories: Exclude<ServiceFilter, "all">[];
};

type FeatureItem = {
  title: string;
  description: string;
  tone: "mint" | "sun" | "rose";
  icon: "tub" | "sun" | "leaf";
};

const tabs: { label: string; filter: ServiceFilter }[] = [
  { label: "全部", filter: "all" },
  { label: "狗狗", filter: "dog" },
  { label: "猫咪", filter: "cat" },
  { label: "养护", filter: "care" },
];

const services: ServiceCard[] = [
  {
    title: "轻柔香波浴",
    price: "¥98起",
    description: "温和清洁、耳眼护理、指甲修剪、足底毛修整和吹干梳理。",
    image: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=900&q=85",
    alt: "洗护后的狗狗",
    categories: ["dog", "care"],
  },
  {
    title: "全套美容护理",
    price: "¥198起",
    description: "包含基础洗护、造型修剪、毛结处理和定制留毛方案。",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=85",
    alt: "美容台上的狗狗",
    categories: ["dog"],
  },
  {
    title: "猫咪安静洗护",
    price: "¥168起",
    description: "低噪吹干、情绪观察、去浮毛梳理，适合敏感猫咪预约。",
    image: "https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?auto=format&fit=crop&w=900&q=85",
    alt: "干净放松的猫咪",
    categories: ["cat", "care"],
  },
  {
    title: "皮毛舒缓护理",
    price: "¥128起",
    description: "针对换毛期、皮屑和干燥毛发，使用保湿润泽护理方案。",
    image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=85",
    alt: "宠物护理用品",
    categories: ["care"],
  },
  {
    title: "幼宠首次体验",
    price: "¥88起",
    description: "缩短流程、分段适应水声和风声，帮助幼宠建立洗护安全感。",
    image: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=900&q=85",
    alt: "宠物与主人互动",
    categories: ["dog", "cat", "care"],
  },
  {
    title: "局部清洁快修",
    price: "¥39起",
    description: "眼周、爪爪、臀部和泪痕清洁，适合日常补充护理。",
    image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=900&q=85",
    alt: "可爱的宠物",
    categories: ["dog", "cat"],
  },
];

const features: FeatureItem[] = [
  {
    title: "独立洗护台",
    description: "每只宠物单独清洁、单独吹干，工具按区域消毒收纳。",
    tone: "mint",
    icon: "tub",
  },
  {
    title: "恒温水流",
    description: "按季节调节水温和风量，减少冲洗、吹干时的紧张感。",
    tone: "sun",
    icon: "sun",
  },
  {
    title: "温和护理品",
    description: "根据皮肤状态选择香波，敏感肤质可备注无香型方案。",
    tone: "rose",
    icon: "leaf",
  },
];

const reviews = [
  {
    text: "我家狗狗很怕吹风，这里会中途停下来安抚，洗完也没有炸毛，香味很自然。",
    name: "小林 · 柯基主人",
    detail: "基础洗护 · 复购 6 次",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  },
  {
    text: "猫咪第一次洗护没有应激，回家后状态很好。美容师还提醒了耳朵清洁周期。",
    name: "阿哲 · 布偶猫主人",
    detail: "猫咪安静洗护",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  },
  {
    text: "预约准时，店里没有乱糟糟的味道，剪指甲也很利落。以后固定来了。",
    name: "周周 · 贵宾犬主人",
    detail: "全套美容护理",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
  },
  {
    text: "洗护前会先检查皮肤和毛结，价格也讲得很清楚。回家后毛蓬蓬的，手感特别好。",
    name: "Ellen · 萨摩耶主人",
    detail: "皮毛舒缓护理",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80",
  },
  {
    text: "我家小狗胆子小，美容师没有硬来，分几次让它适应水声。这个细节真的很安心。",
    name: "小满 · 比熊主人",
    detail: "幼宠首次体验",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
  },
  {
    text: "每次结束都会发护理记录，哪里有皮屑、下次多久来，一眼就能看懂。",
    name: "王女士 · 英短主人",
    detail: "护理记录跟进",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=160&q=80",
  },
  {
    text: "临时加了局部清洁也安排得很快，没有推销压力。狗狗出来时很放松。",
    name: "阿南 · 雪纳瑞主人",
    detail: "局部清洁快修",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=160&q=80",
  },
  {
    text: "空间明亮，没有刺鼻香精味。长毛猫梳开毛结后还拍了对比图，服务很细。",
    name: "晴晴 · 缅因猫主人",
    detail: "长毛猫梳理",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=160&q=80",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Services />
        <Care />
        <SpaceGallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-[rgba(223,230,234,0.8)] bg-[rgba(247,250,248,0.92)] backdrop-blur-[18px]">
      <nav className="mx-auto flex h-[68px] w-[min(1180px,calc(100%_-_32px))] items-center justify-between gap-[18px] max-[560px]:h-[62px] max-[560px]:w-[min(calc(100%_-_24px),1180px)]" aria-label="主导航">
        <a className="flex items-center gap-2.5 whitespace-nowrap font-extrabold" href="#top" aria-label="泡泡尾巴首页">
          <span className="grid h-[38px] w-[38px] place-items-center rounded-xl bg-[var(--leaf)] text-white shadow-[0_8px_20px_rgba(47,143,123,0.28)]" aria-hidden="true">
            <PawIcon />
          </span>
          <span className="max-[560px]:max-w-[150px] max-[560px]:overflow-hidden max-[560px]:text-ellipsis">泡泡尾巴洗护</span>
        </a>
        <div className="flex items-center gap-[22px] text-sm text-[var(--muted)] max-[900px]:hidden">
          <a className="hover:text-[var(--leaf)]" href="#services">服务</a>
          <a className="hover:text-[var(--leaf)]" href="#care">护理</a>
          <a className="hover:text-[var(--leaf)]" href="#space">门店</a>
          <a className="hover:text-[var(--leaf)]" href="#reviews">评价</a>
          <a className="hover:text-[var(--leaf)]" href="#contact">联系</a>
        </div>
        <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--leaf)] px-[18px] font-bold text-white shadow-[0_12px_26px_rgba(47,143,123,0.25)] transition hover:-translate-y-0.5 max-[560px]:min-h-10 max-[560px]:px-[13px] max-[560px]:text-[13px]" href="#booking">
          立即预约
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const petName = String(formData.get("petName") || "").trim() || "宝贝";
    const arrivalTime = String(formData.get("arrivalTime") || "").trim();
    const arrivalText = arrivalTime ? `，期望到店时间：${arrivalTime.replace("T", " ")}` : "";
    setStatus(`${petName}的预约已记录${arrivalText}，我们会尽快联系确认。`);
    form.reset();
  }

  return (
    <section
      className="grid min-h-[92vh] items-end bg-cover bg-center px-0 pb-[46px] pt-[110px] max-[900px]:min-h-0 max-[900px]:pb-[34px] max-[900px]:pt-[102px]"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgba(12, 26, 29, 0.72) 0%, rgba(12, 26, 29, 0.48) 44%, rgba(12, 26, 29, 0.1) 100%), url("https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1800&q=85")',
      }}
    >
      <div className="mx-auto grid w-[min(1180px,calc(100%_-_32px))] grid-cols-[minmax(0,660px)_minmax(280px,390px)] items-end gap-[42px] text-white max-[900px]:grid-cols-1 max-[560px]:w-[min(calc(100%_-_24px),1180px)]">
        <div>
          <div className="mb-[18px] inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-2 text-sm font-bold backdrop-blur-xl">
            社区宠物洗护 · 预约制到店
          </div>
          <h1 className="m-0 max-w-[620px] text-[clamp(42px,7vw,86px)] font-extrabold leading-[0.98] tracking-normal max-[560px]:text-[42px]">
            泡泡尾巴宠物洗护店
          </h1>
          <p className="mt-[22px] max-w-[560px] text-[clamp(17px,2.1vw,22px)] leading-[1.7] text-white/85">
            给猫狗准备温和清洁、基础美容、皮毛养护和放松等待区。干净、安静、可追踪，每一次洗护都有清楚记录。
          </p>
          <div className="mt-[30px] flex flex-wrap gap-3 max-[560px]:grid">
            <a className="hero-primary-btn" href="#booking">
              预约洗护
            </a>
            <a className="hero-secondary-btn" href="#services">
              查看套餐
            </a>
          </div>
        </div>

        <aside className="rounded-lg bg-white/95 p-[22px] text-[var(--ink)] shadow-[var(--shadow)] max-[900px]:max-w-[560px]" id="booking" aria-label="快速预约">
          <h2 className="mb-4 mt-0 text-[22px] font-bold">快速预约</h2>
          <form className="grid gap-3" onSubmit={handleSubmit}>
            <FormField label="宠物昵称" htmlFor="petName">
              <input className="min-h-11 w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2.5 outline-none focus:border-[var(--leaf)] focus:shadow-[0_0_0_4px_rgba(47,143,123,0.12)]" id="petName" name="petName" type="text" placeholder="例如：团子" required />
            </FormField>
            <FormField label="宠物类型" htmlFor="petType">
              <select className="min-h-11 w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2.5 outline-none focus:border-[var(--leaf)] focus:shadow-[0_0_0_4px_rgba(47,143,123,0.12)]" id="petType" name="petType">
                <option>小型犬</option>
                <option>中大型犬</option>
                <option>短毛猫</option>
                <option>长毛猫</option>
              </select>
            </FormField>
            <FormField label="服务项目" htmlFor="service">
              <select className="min-h-11 w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2.5 outline-none focus:border-[var(--leaf)] focus:shadow-[0_0_0_4px_rgba(47,143,123,0.12)]" id="service" name="service">
                <option>轻柔香波浴</option>
                <option>全套美容护理</option>
                <option>皮毛舒缓护理</option>
              </select>
            </FormField>
            <FormField label="期望到店时间" htmlFor="arrivalTime">
              <input className="min-h-11 w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2.5 outline-none focus:border-[var(--leaf)] focus:shadow-[0_0_0_4px_rgba(47,143,123,0.12)]" id="arrivalTime" name="arrivalTime" type="datetime-local" required />
            </FormField>
            <FormField label="联系电话" htmlFor="phone">
              <input className="min-h-11 w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2.5 outline-none focus:border-[var(--leaf)] focus:shadow-[0_0_0_4px_rgba(47,143,123,0.12)]" id="phone" name="phone" type="tel" placeholder="请输入手机号" required />
            </FormField>
            <button className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-[var(--leaf)] px-[18px] font-bold text-white shadow-[0_12px_26px_rgba(47,143,123,0.25)] transition hover:-translate-y-0.5" type="submit">
              提交预约
            </button>
            <div className="min-h-[22px] text-sm font-bold text-[var(--leaf)]" aria-live="polite">{status}</div>
          </form>
        </aside>
      </div>
    </section>
  );
}

function Services() {
  const [activeFilter, setActiveFilter] = useState<ServiceFilter>("all");
  const visibleServices = useMemo(
    () => services.filter((service) => activeFilter === "all" || service.categories.includes(activeFilter)),
    [activeFilter],
  );

  return (
    <section className="py-[82px] max-[560px]:py-[58px]" id="services">
      <div className="mx-auto w-[min(1180px,calc(100%_-_32px))] max-[560px]:w-[min(calc(100%_-_24px),1180px)]">
        <SectionHead
          title="适合不同毛孩子的洗护套餐"
          text="按体型、毛量和皮肤状态选择护理方案，到店后美容师会再次检查并确认服务内容。"
        />
        <div className="mb-[22px] flex flex-wrap gap-2.5" role="tablist" aria-label="套餐筛选">
          {tabs.map((tab) => (
            <button
              className={`cursor-pointer rounded-full border px-4 py-2.5 font-bold ${activeFilter === tab.filter ? "border-[var(--leaf)] bg-[var(--leaf)] text-white" : "border-[var(--line)] bg-white text-[var(--muted)]"}`}
              key={tab.filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === tab.filter}
              onClick={() => setActiveFilter(tab.filter)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-[18px] max-[900px]:grid-cols-1">
          {visibleServices.map((service) => (
            <article className="min-h-[310px] overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-[0_12px_30px_rgba(36,60,68,0.07)]" data-type={service.categories.join(" ")} key={service.title}>
              <Image className="h-[178px] w-full object-cover" src={service.image} alt={service.alt} width={900} height={600} />
              <div className="p-[18px]">
                <div className="mb-2.5 flex items-baseline justify-between gap-3 max-[560px]:items-start max-[560px]:flex-col max-[560px]:gap-1">
                  <h3 className="m-0 text-[21px] font-bold">{service.title}</h3>
                  <span className="whitespace-nowrap text-2xl font-black text-[var(--leaf)]">{service.price}</span>
                </div>
                <p className="m-0 leading-[1.65] text-[var(--muted)]">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Care() {
  return (
    <section className="border-y border-[var(--line)] bg-white py-[82px] max-[560px]:py-[58px]" id="care">
      <div className="mx-auto grid w-[min(1180px,calc(100%_-_32px))] grid-cols-[1.12fr_0.88fr] items-center gap-[38px] max-[900px]:grid-cols-1 max-[560px]:w-[min(calc(100%_-_24px),1180px)]">
        <div className="grid gap-3.5">
          <div
            className="min-h-[520px] overflow-hidden rounded-lg bg-cover bg-center max-[900px]:min-h-[390px]"
            aria-label="宠物洗护门店环境"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85")' }}
          />
          <div className="rounded-lg border border-[var(--line)] bg-[var(--paper)] p-[18px] shadow-[0_10px_24px_rgba(36,60,68,0.06)]">
            <strong className="mb-2 block">营业时间</strong>
            <span className="block leading-[1.7] text-[var(--muted)]">周一至周五 10:00 - 20:00</span>
            <span className="block leading-[1.7] text-[var(--muted)]">周末及节假日 09:30 - 21:00</span>
          </div>
        </div>
        <div>
          <SectionHead title="洗护过程看得见，也让宠物慢慢放松" />
          <div className="grid gap-4">
            {features.map((feature) => (
              <div className="grid grid-cols-[46px_minmax(0,1fr)] items-start gap-3.5" key={feature.title}>
                <span className={`grid h-[46px] w-[46px] place-items-center rounded-lg text-[var(--ink)] ${feature.tone === "mint" ? "bg-[#e6f4ef]" : feature.tone === "sun" ? "bg-[#fff0d6]" : "bg-[#fde8e6]"}`}>
                  <FeatureIcon icon={feature.icon} />
                </span>
                <div>
                  <h3 className="mb-1.5 mt-0 text-xl font-bold">{feature.title}</h3>
                  <p className="m-0 leading-[1.7] text-[var(--muted)]">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpaceGallery() {
  return (
    <section className="py-[82px] max-[560px]:py-[58px]" id="space">
      <div className="mx-auto w-[min(1180px,calc(100%_-_32px))] max-[560px]:w-[min(calc(100%_-_24px),1180px)]">
        <SectionHead
          title="清爽明亮的洗护空间"
          text="等待区、洗护区和美容区分区明确，主人可在休息区查看进度。"
        />
        <div className="grid grid-cols-[1.15fr_0.85fr] gap-[18px] max-[900px]:grid-cols-1">
          <Image className="h-full min-h-[260px] w-full rounded-lg object-cover" src="/images/space-waiting.png" alt="高端宠物洗护店等待区" width={1200} height={900} />
          <div className="grid gap-[18px]">
            <Image className="h-full min-h-[260px] w-full rounded-lg object-cover" src="/images/space-wash.png" alt="高端宠物洗护店洗护区" width={900} height={520} />
            <Image className="h-full min-h-[260px] w-full rounded-lg object-cover" src="/images/space-grooming.png" alt="高端宠物洗护店美容区" width={900} height={520} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviewLoop = [...reviews, ...reviews];

  return (
    <section className="py-[82px] max-[560px]:py-[58px]" id="reviews">
      <div className="mx-auto w-[min(1180px,calc(100%_-_32px))] max-[560px]:w-[min(calc(100%_-_24px),1180px)]">
        <SectionHead
          title="附近铲屎官的真实反馈"
          text="来自真实到店家庭的洗护体验，我们会记录每次用时、毛结情况和护理建议，方便下次继续跟进。"
        />
        <div className="mb-[24px] grid grid-cols-3 gap-[18px] max-[760px]:grid-cols-1">
          <ReviewMetric value="4.9/5" label="到店评分" />
          <ReviewMetric value="312+" label="累计评价" />
          <ReviewMetric value="86%" label="来自老客推荐" />
        </div>
        <div className="review-carousel" aria-label="客户评价轮播">
          <div className="review-track">
            {reviewLoop.map((review, index) => (
              <article className="review-card" key={`${review.name}-${index}`} aria-hidden={index >= reviews.length}>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-lg tracking-normal text-[var(--sun)]" aria-label="五星评价">★★★★★</div>
                  <span className="rounded-full bg-[#e6f4ef] px-3 py-1 text-xs font-extrabold text-[var(--leaf)]">{review.detail}</span>
                </div>
                <p className="m-0 min-h-[92px] leading-[1.75] text-[var(--muted)]">“{review.text}”</p>
                <div className="mt-auto flex items-center gap-3 font-extrabold">
                  <Image className="h-[46px] w-[46px] rounded-full object-cover" src={review.avatar} alt="客户头像" width={92} height={92} />
                  <span>{review.name}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2" aria-hidden="true">
          {reviews.slice(0, 4).map((review) => (
            <span className="h-2 w-2 rounded-full bg-[var(--leaf)]/35" key={review.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(36,60,68,0.05)]">
      <strong className="block text-[28px] leading-none text-[var(--leaf)]">{value}</strong>
      <span className="mt-2 block text-sm font-bold text-[var(--muted)]">{label}</span>
    </div>
  );
}

function Contact() {
  return (
    <section className="bg-[var(--ink)] pb-[42px] pt-[82px] text-white max-[560px]:py-[58px]" id="contact">
      <div className="mx-auto w-[min(1180px,calc(100%_-_32px))] max-[560px]:w-[min(calc(100%_-_24px),1180px)]">
        <SectionHead
          title="到店前先预约，减少等待时间"
          text="可以电话确认当天空位，也可以在页面提交预约信息。"
          dark
        />
        <div className="grid grid-cols-3 gap-[18px] max-[900px]:grid-cols-1">
          <ContactCard title="门店地址" text="上海市静安区宠爱路 88 号 1 层" />
          <ContactCard title="预约电话" text={<>021-6688-9052<br />微信：BubbleTailPet</>} />
          <ContactCard title="贴心提示" text="首次到店请携带疫苗记录，皮肤敏感或近期用药请提前告知。" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--ink)] py-5 text-sm text-white/70">
      <div className="mx-auto flex w-[min(1180px,calc(100%_-_32px))] flex-wrap justify-between gap-[18px] max-[560px]:w-[min(calc(100%_-_24px),1180px)]">
        <span>© 2026 泡泡尾巴宠物洗护店</span>
        <span>温柔洗护 · 清爽回家</span>
      </div>
    </footer>
  );
}

function SectionHead({ title, text, dark = false }: { title: string; text?: string; dark?: boolean }) {
  return (
    <div className="mb-[30px] flex items-end justify-between gap-6 max-[900px]:items-start max-[900px]:flex-col">
      <h2 className="m-0 max-w-[680px] text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.12]">{title}</h2>
      {text ? <p className={`m-0 max-w-[430px] leading-[1.7] ${dark ? "text-white/70" : "text-[var(--muted)]"}`}>{text}</p> : null}
    </div>
  );
}

function FormField({ children, htmlFor, label }: { children: React.ReactNode; htmlFor: string; label: string }) {
  return (
    <div className="grid gap-1.5">
      <label className="text-[13px] font-bold text-[var(--muted)]" htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}

function ContactCard({ title, text }: { title: string; text: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/15 bg-white/[0.06] p-[22px]">
      <h3 className="mb-2.5 mt-0 text-xl font-bold">{title}</h3>
      <p className="m-0 leading-[1.7] text-white/70">{text}</p>
    </div>
  );
}

function PawIcon() {
  return (
    <svg className="h-[23px] w-[23px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.5 10.2c1.38 0 2.5-1.55 2.5-3.45S8.88 3.3 7.5 3.3 5 4.85 5 6.75s1.12 3.45 2.5 3.45Zm9 0c1.38 0 2.5-1.55 2.5-3.45S17.88 3.3 16.5 3.3 14 4.85 14 6.75s1.12 3.45 2.5 3.45ZM5.65 14.9c1.22 0 2.2-1.12 2.2-2.5s-.98-2.5-2.2-2.5-2.2 1.12-2.2 2.5.98 2.5 2.2 2.5Zm12.7 0c1.22 0 2.2-1.12 2.2-2.5s-.98-2.5-2.2-2.5-2.2 1.12-2.2 2.5.98 2.5 2.2 2.5ZM12 11.7c-2.5 0-5.35 3.05-5.35 5.62 0 1.68 1.28 2.86 3.02 2.86.84 0 1.58-.32 2.33-.32s1.49.32 2.33.32c1.74 0 3.02-1.18 3.02-2.86 0-2.57-2.85-5.62-5.35-5.62Z" />
    </svg>
  );
}

function FeatureIcon({ icon }: { icon: FeatureItem["icon"] }) {
  if (icon === "sun") {
    return (
      <svg className="h-6 w-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2M12 19v2m-7.78-16.78 1.42 1.42m12.72 12.72 1.42 1.42M3 12h2M19 12h2" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    );
  }

  if (icon === "leaf") {
    return (
      <svg className="h-6 w-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7c-2.5.1-4.4 1-5.6 2.5C12.9 7 10.3 5.4 7 5.1M4 7c.3 7.2 3 11.4 8 12 5-.6 7.7-4.8 8-12M12 19V9" />
      </svg>
    );
  }

  return (
    <svg className="h-6 w-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 14c0-4.4 3.6-8 8-8s8 3.6 8 8M7 14v4M17 14v4M8 18h8M9 6V4h6v2" />
    </svg>
  );
}
