import React from 'react';
    import {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselNext,
      CarouselPrevious,
    } from "@/components/ui/carousel";

    const trainers = [
      {
        name: '제시카 마일스',
        specialty: 'HIIT & 유산소',
        imageAlt: '피트니스 트레이너 제시카 마일스의 초상',
        imageUrl: 'https://horizons-cdn.hostinger.com/80edb374-3ea8-453d-be94-0b0265c830c7/cc771d2544b85950999037565c143865.png'
      },
      {
        name: '마크 존슨',
        specialty: '근력 & 보디빌딩',
        imageAlt: '피트니스 트레이너 마크 존슨의 초상',
        imageUrl: 'https://horizons-cdn.hostinger.com/80edb374-3ea8-453d-be94-0b0265c830c7/8c9124165fa44faa5c59e6375376c3c7.png'
      },
      {
        name: '에밀리 첸',
        specialty: '요가 & 유연성',
        imageAlt: '피트니스 트레이너 에밀리 첸의 초상',
        imageUrl: 'https://horizons-cdn.hostinger.com/80edb374-3ea8-453d-be94-0b0265c830c7/46a69ce0a29d108f9eed4b29c4b3a147.png'
      },
      {
        name: '데이비드 리',
        specialty: '기능성 피트니스',
        imageAlt: '덤벨을 들고 있는 피트니스 트레이너 데이비드 리',
        imageUrl: 'https://horizons-cdn.hostinger.com/80edb374-3ea8-453d-be94-0b0265c830c7/18af204ed23feb18df5ae652054de683.jpg'
      },
      {
        name: '소피아 로드리게스',
        specialty: '크로스핏 & 지구력',
        imageAlt: '스트레칭 중인 피트니스 트레이너 소피아 로드리게스',
        imageUrl: 'https://horizons-cdn.hostinger.com/80edb374-3ea8-453d-be94-0b0265c830c7/35fd06ef20886e8deabef6d49c0733f1.jpg'
      },
    ];

    const Trainers = () => {
      return (
        <section className="bg-[#0C0C0C] py-20 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl lg:max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <span className="text-[#B1F82A]">세계적인</span> 트레이너들을 만나보세요
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                목표가 무엇이든, 인증받은 전문가들이 당신의 피트니스 여정을 함께합니다.
              </p>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {trainers.map((trainer, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div className="group relative flex flex-col h-full bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden p-6 transition-all">
                        <div className="relative rounded-lg overflow-hidden mb-6 aspect-[4/5]">
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            alt={trainer.imageAlt} src={trainer.imageUrl} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                        <p className="text-[#B1F82A] font-semibold">{trainer.specialty}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-white bg-gray-800 hover:bg-[#1e04fb] hover:text-white" />
              <CarouselNext className="text-white bg-gray-800 hover:bg-[#1e04fb] hover:text-white" />
            </Carousel>
          </div>
        </section>
      );
    };

    export default Trainers;