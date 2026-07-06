import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock } from '../../../components/blocks'
import { researchSidebar } from '../../../utils/sidebarConfig'

const publications = [
  'R Sathiyaseelan, K. Yogitha, Abdusamatov Alisher, Barno Matchanova, Otajonova Gulkhayo, B.Venkataramanaiah "Novel Framework for Fake News and Scam Prediction using NLP and Transfer Learning Model" 5th International Conference on Sentiment Analysis and Deep Learning (ICSADL-2026), 2026.',
  'R Sathiyaseelan, K Ranganathan, R Ramamoorthy, M Pedda Chennaiah "Haemorrhage diagnosis in colour fundus images using a fast-convolutional neural network based on a modified U-Net" Network: Computation in Neural Systems, Vol 36, Pages 198-219, 2025',
  'P Anandan, N Anbuselvan, Siow Chun Lim "Enhancing Smart Microgrid Sustainability with Lyrebird-Based EV Charging Optimization" Multimedia University Engineering Conference (MECON), 2025',
  'R Aiyshwariya Devi, Bharti Mehra, M Kavitha, P. Anandan "Traffic Prediction and Mitigation in 6G Software-Defined Networks Using Bobcat Bi-GRU and Reinforcement Learning Based on Proximal Policy Optimization" Knowledge-Based Systems, Vol 328, 114243, 2025',
  'B.Senthilraja, P. Anandan, S. Anbu Karuppusamy "Optimized deep learning based interested region selection for reversible image watermarking using Haar wavelet transform" Sadhana, Vol 50, 2025',
  'N. Senthilkumar, G. Perumal, K. Shanmuga Elango, S. Thirumalvalavan, S. Selvarasu. (2026) \'Electrical Discharge Coating Variables Multi-Criteria Optimization Utilizing TOPSIS Method on the Wear Behaviour of WS2-Cu Coating on AA7075 Alloy\', MDPI, Engineering Proceedings, Vol. 130, Article 8.',
  'N. Senthilkumar, S. Thirumalvalavan, S. Selvarasu, G. Perumal. (2026) \'Cutting Performance and Damage Metrics in Abrasive Waterjet Machining of Delrin–Ramie Fiber Composites\', MDPI, Engineering Proceedings, Vol. 130, Article 8.',
  'Anbarasan, M. Perumal, G. Thirumalvalavan, S. Senthilkumar, N. (2026) \'Statistical Approach of Al2O3-13%TiO2/8YSZ Plasma Spray Coatings on Ti-6Al-4V alloy: Investigation, Modeling, and Optimization\', Journal of Materials Engineering and Performance.',
  'Thirumalvalavan, S. Thanikasalam, A. Senthilkumar, N. Sabari, K. Yuvaperiyasamy, M. (2025) \'Investigations on the Emission and performance characteristics of a direct injection Diesel Engine Fuelled with Dual Biodiesel Blends\', Advanced Engineering Letters, Vol. 4, no. 3, pp. 105-117.',
  'Tiwari, M. Thirumalvalavan, S. Ramya, G. Srimannarayana, V.V. Pulivarthy, P. Golla, S. (2025) \'Implementing the Particle Swarm Optimization Algorithm to Enhance the Positioning of Sensors in an Indoor CO2 Monitoring System Using Wireless Sensor Networks\', Proceedings of the 2024 International Conference on Advances in Computing, Communication and Materials (ICACCM), IEEE Xplore.',
]

const Publication = () => (
  <InnerPageLayout sidebarTitle={researchSidebar.title} sidebarLinks={researchSidebar.links}>
    <PageHeader title="Research" />

    <SectionBlock>
      <div className="space-y-6">
        {publications.map((pub, index) => (
          <p key={index} className="text-[15px] leading-8 text-gray-700 text-justify">
            <span className="font-bold text-[#001a66] mr-1">{index + 1}.</span> {pub}
          </p>
        ))}
      </div>
    </SectionBlock>
  </InnerPageLayout>
)

export default Publication
