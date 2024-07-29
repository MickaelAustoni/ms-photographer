"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const TITLE = "Michael Sanchez Photography";
const LOGO_WIDTH = 400;
const LOGO_HEIGHT = 391;

const TEXT_VARIANTS: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
    fill: "rgba(255,255,255,0)"
  },
  visible: (i: number) => {
    const delay = (i + 2) * (0.1);

    return {
      pathLength: 1,
      opacity: 1,
      fill: "rgba(255,255,255,1)",
      transition: {
        fill: {
          delay,
          duration: 0.8
        },
        pathLength: {
          delay,
          type: "spring",
          duration: 0.8,
          bounce: 0
        },
        opacity: {
          delay,
          duration: 0.01
        }
      }
    };
  }
};

export default function Title() {
  const [isAnimating, setIsAnimating] = useState(true);

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  }

  return (
    <Link href={"/"}>
      <motion.h1
        title={isAnimating ? undefined : TITLE}
        className={"z-[100] indent-[-9999px] text-[0] absolute select-none justify-center items-center flex"}
        onAnimationComplete={handleAnimationComplete}
        initial={{
          opacity: 1,
          x: 0,
          y: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0,0,0,1)",
        }}
        animate={{
          opacity: 1,
          x: 20,
          y: 20,
          height: LOGO_HEIGHT / 2,
          width: LOGO_WIDTH / 2,
          backgroundColor: "rgba(255,255,255,0)",
          transition: {
            delay: isAnimating ? 4.2 : 0,
            type: "spring",
            duration: 1,
            backgroundColor: {
              delay: 4,
              duration: 0.35
            }
          }
        }}
        whileHover={isAnimating ? undefined : {
          opacity: 0.7,
          scale: 0.98,
          transition: {
            duration: 0.15,
            delay: 0
          }
        }}
      >
        {TITLE}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 782.44 766"
          initial="hidden"
          animate="visible"
          fill="transparent"
          strokeWidth={2}
          stroke="#fff"
          style={{
            maxWidth: LOGO_WIDTH,
            maxHeight: LOGO_HEIGHT
          }}
        >
          <motion.path
            d="m174.5264,403.1367c-1.7163.1787-3.3765.5117-5.1157.5146-3.4907.0068-7.0073-1.0557-9.7354-3.2627-2.4653-1.9941-4.1016-4.8018-5.2139-7.7314-2.6533-6.9854-1.772-14.5576-1.1709-21.8164.1724-2.0811.3384-4.1738.3398-6.2627,0-.334-.0879-.7412-.0527-1.0645.0044-.042.0054-.0771.0034-.1064-.1533.0781-.4429.1885-.501.2148-.356.166-.6953.3789-1.0366.5723-3.0337,1.7197-5.9668,3.6113-8.8682,5.543-5.7944,3.8594-11.4814,7.9248-17.6382,11.1992-3.0942,1.6455-6.3179,3.0957-9.6533,4.1807-3.1406,1.0225-6.8208,2.1191-10.1104,1.1973-6.7632-1.8936-6.8003-10.1328-5.8032-15.7227,2.5591-14.3457,8.5073-27.9961,14.5591-41.1577,3.0654-6.666,6.2402-13.2822,9.2163-19.9897,1.4561-3.2817,2.8608-6.5854,4.1753-9.9268.6538-1.6611,1.2861-3.3315,1.8916-5.0112.0981-.2715.208-.5488.314-.8291-10.6914,7.2051-21.1226,14.7974-31.2417,22.7866-6.6431,5.2446-13.1641,10.6504-19.5576,16.2056-1.6997,7.0913-4.6348,13.8726-8.0293,20.3052-8.0225,15.1992-18.1328,29.4629-29.3389,42.4717-5.5396,6.4297-11.4272,12.5605-17.644,18.3389-3.0889,2.8701-6.2373,5.7031-9.5317,8.3369-3.4229,2.7373-7.0425,5.1699-11.2466,6.5264-.8472.2734-2.0918-.167-2.4717-1.0059-3.0859-6.8115,1.1782-13.7373,4.6143-19.5127,3.5762-6.0107,7.5029-11.8096,11.6904-17.4111,15.1982-20.332,33.478-38.4258,52.3174-55.3638,1.9268-1.7319,3.8696-3.4468,5.8213-5.1509.1318-.6074.2578-1.2163.3701-1.8291,1.1421-6.2124,1.8955-14.8564-2.8906-19.8428-4.5039-4.6914-11.8506-3.0669-17.1323-.7485-6.772,2.9731-13.0762,7.3125-18.603,12.1968-5.6987,5.0356-11.0742,10.834-14.9297,17.4229-.9805,1.6758-1.8799,3.4189-2.5698,5.2363-.6411,1.6885-1.561,3.7139-1.3325,5.5605.1943,1.5723,1.3379,2.8174,2.8545,3.2607,2.0537.6006,4.2896-.1875,6.2427-.8066.7207-.2285,1.2153.918.5186,1.2305-1.8682.8379-3.8911,1.7734-5.9829,1.7959-3.5557.0381-6.7534-2.7041-6.6929-6.3457.0347-2.082.7642-4.2168,1.4922-6.1455.7383-1.9551,1.6206-3.8564,2.6357-5.6831,4.0439-7.2759,9.8633-13.771,16.1289-19.2031,6.0259-5.2241,12.9014-9.9707,20.3569-12.9009,6.6562-2.6162,15.1353-3.2808,20.3418,2.564,4.7544,5.3364,5.0869,12.9976,4.2456,19.8726,15.9868-13.6152,32.7739-26.2944,50.2642-37.9146.6177-.4102,1.5996-.4082,2.2178,0,1.376.9082,1.9849,2.3179,1.9336,3.9502-.0522,1.6831-.7222,3.2515-1.2944,4.8076-.6157,1.6753-1.2568,3.3413-1.9185,4.999-1.3657,3.4219-2.8145,6.8105-4.3105,10.1768-2.9502,6.6406-6.0933,13.1938-9.1284,19.7954-5.9272,12.8926-11.8125,26.3564-14.1724,40.4453-.4126,2.4629-.6567,5.4209.3921,7.7646,1.2798,2.8594,4.3325,2.5566,6.9282,1.9326,6.5386-1.5713,12.4946-4.7861,18.1494-8.3418,5.9263-3.7266,11.5771-7.876,17.563-11.5088,2.6611-1.6152,6.8208-4.7188,9.5986-1.6689,1.2344,1.3545,1.2749,3.2988,1.2349,5.0254-.0483,2.0908-.21,4.1777-.3877,6.2607-.5815,6.8174-1.5459,14.3037,1.4189,20.7451,1.2622,2.7432,3.1812,5.0068,5.9497,6.3047,2.7764,1.3008,6.4902,1.7324,9.5264,1.417,1.9907-.2061,1.9697,2.9033,0,3.1074Zm-101.2397-65.1426c-10.3901,9.3057-20.416,19.0186-30.0229,29.1172-8.3105,8.7354-16.2705,17.8379-23.3994,27.5693-3.6177,4.9395-7.0283,10.0312-10.1719,15.2852-1.5029,2.5117-3.1094,5.0537-4.207,7.7754-.728,1.8057-1.3623,3.9316-1.1206,5.9268,1.1045-.4863,2.1665-1.0615,3.2017-1.7021,3.313-2.0498,6.2578-4.6426,9.1763-7.2061,2.8779-2.5293,5.6904-5.1318,8.4351-7.8047,5.5908-5.4443,10.8999-11.1787,15.9126-17.1592,10.1172-12.0723,19.252-25.2314,26.5991-39.1787,2.146-4.0742,4.0737-8.2793,5.5972-12.623Zm80.2637,25.2998"
            variants={TEXT_VARIANTS}
            custom={0}
          />
          <motion.path
            d="m202.0088,382.5117c-4.2734,1.7939-8.8149,2.1943-13.3765,2.7461-4.3594.5273-8.7441,1.1543-13.1382,1.2832-1.8667.0547-4.5654.0723-5.7539-1.6533-1.3784-2.0029.1338-3.8066,1.6655-5.0928,1.4878-1.249,3.0801-2.4082,4.8013-3.3154,1.4434-.7598,3.4116-1.8545,5.0396-1.1025.582.2695.7666,1.1504.437,1.666-.959,1.501-2.9585,2.3359-4.3906,3.3232-.8179.5635-1.6025,1.1562-2.3501,1.8105-.019.0176-.041.0352-.0625.0537.3335-.0117.6353-.0283.8335-.0361,1.2705-.0449,2.5396-.1416,3.8052-.2578,2.3965-.2207,4.7866-.5166,7.1758-.8037,4.9902-.5996,9.9761-1.5518,15.0024-.9268,1.3516.168,1.5527,1.7852.3115,2.3057Zm-19.416-9.0059c-.3623-.5459-.353-1.3945,0-1.9414.0093-.0156.019-.0303.0288-.0449.5-.7754,1.3657-1.1357,2.2715-.9248.3306.0771.624.1768.9395.3115.3887.166.6514.4551.8896.792.3135.4443.3057,1.2158,0,1.6611-.2393.3486-.4937.623-.8896.7979-.3262.1426-.6025.2344-.9395.3164-.9053.2227-1.7632-.1582-2.2715-.9238-.0098-.0146-.0195-.0293-.0288-.0439Z"
            variants={TEXT_VARIANTS}
            custom={1}
          />
          <motion.path
            d="m239.4165,384.6709c-1.6162,1.6934-4.1777,2.1045-6.3882,2.5332-2.1665.4199-4.376.6514-6.583.501-4.3989-.3008-8.5933-1.9932-13.0024-2.1309-2.2158-.0684-4.4111.2344-6.5977.5547-2.1426.3145-4.4341.8135-6.6069.6719-2.3311-.1523-4.0059-2.0283-3.1484-4.3691.5952-1.623,1.8696-3.0293,3.2559-4.0244,1.373-.9863,3.064-1.6367,4.752-1.7705,1.2036-.0947,3.5908.0762,3.8716,1.5986.3037,1.6494-3.167,1.8018-4.1782,2.2051-.8164.3252-1.5713.7998-2.2139,1.3965-.1875.1748-.3701.3545-.5415.5439.021-.001.0425-.002.0635-.0039.8911-.0762,1.7778-.1885,2.6626-.3164,1.7319-.249,3.4604-.5312,5.2021-.708,3.502-.3555,6.8721.1045,10.2935.8486,3.1841.6934,6.269,1.3721,9.5474,1.0703,2.8906-.2656,6.1021-1.9492,8.9644-1.0537,1.0625.333,1.4248,1.6377.6475,2.4531Zm-38.8906-2.1865.6606,1.1455"
            variants={TEXT_VARIANTS}
            custom={2}
          />
          <motion.path
            d="m241.1987,379.1289c-.7764.9043-1.498,1.7666-2.1807,2.6865.7881-.3584,1.5967-.6777,2.4004-.9785,2.4424-.9141,4.9805-1.5742,7.542-2.0547,2.1553-.4053,4.5059-.9131,6.708-.8193,1.0547.0439,2.1123.2832,2.9951.8818,1.0195.6904,1.2812,1.7139,1.999,2.6182.7529.9492,2.5576.7422,3.6504.7412,1.29-.002,2.5801-.0615,3.8672-.1309,3.0293-.1621,6.0566-.4014,9.0752-.7051,1.1406-.1152,2.3271-.3369,3.4766-.2803.4199.0215.7129.1523,1.1055.3115.0039.001.0107.0039.0156.0059.0762.0205.207.0586.2422.0684.3457.0996.7041.2129.9639.4746-.0254-.0029-.0498-.0068-.0742-.0098.6191.5371.8057,1.5439-.0234,2.0352-.0615.0654-.127.1309-.1982.1943-.0869.0781-.8047.6436-.376.2959-.3496.2842-.6631.5596-1.1025.7051-1.3545.4463-2.8809.4873-4.292.625-3.0225.2959-6.0537.5312-9.0879.6846-2.8564.1436-6.3672.5605-8.9561-.8711-.9668-.5342-1.6689-1.3447-2.1934-2.3027-.3965-.7236-.4043-1.0322-1.2637-1.0879-2.1113-.1367-4.4385.3584-6.5068.7393-2.21.4072-4.3906.9609-6.5166,1.6885-2.1641.7402-4.2227,1.7822-6.4146,2.3877-.2954.082-.5698.0605-.812-.0264-.3184.0547-.6396.0488-.9248-.0303-1.2471-.3428-1.7075-1.5322-1.5376-2.708.2046-1.4111,1.1016-2.7695,1.897-3.9199,1.1602-1.6777,2.4727-3.2568,3.8105-4.7939,2.5469-2.9248,5.252-5.708,7.9434-8.499,3.2285-3.3477,6.3643-6.7832,9.585-10.1396,4.1689-4.3447,8.3984-8.6309,12.6416-12.9033,4.0781-4.1074,8.042-8.4189,12.793-11.7686.9072-.6396,2.1973-.2275,2.8291.5649.7354.9229.5029,2.019-.1719,2.8794-2.5732,3.2812-5.0947,6.6016-7.6348,9.9082-4.8887,6.3643-9.833,12.7061-15.3193,18.5723-5.0293,5.3779-10.6318,10.6934-17.2266,14.1064-.0029-.0078-.0068-.0156-.0098-.0234-.1211.0752-.249.1416-.3916.1924-.6211.2236-1.1367.0703-1.4971-.2686-.2783.3164-.5557.6338-.8291.9541Zm.75-3.5654,9.2666-7.1475c.1377-.125.2773-.248.4141-.375,3.5693-3.3096,6.8682-6.8584,10.0107-10.5459-3.4814,3.6338-6.9414,7.2871-10.4248,10.9209Z"
            variants={TEXT_VARIANTS}
            custom={3}
          />
          <motion.path
            d="m322.6411,383.5723c-3.2305,2.2324-7.2793,2.2461-11.0684,2.5264-4.0127.2959-8.2324.5547-11.4062-2.4424-.9346-.8828-1.2441-2.0029-2.668-1.9111-1.4014.0898-2.8125.376-4.1865.6543-3.0264.6123-5.9033,1.75-8.9121,2.3955-1.4111.3027-3.1797.6279-4.5996.1982-1.627-.4902-2.4326-2.3115-1.6406-3.8281.6533-1.252,2.0312-1.957,3.2393-2.5791,1.2852-.6631,2.6436-1.2275,4.0352-1.623,2.5156-.7158,5.8223-1.377,8.1826.1475.2607.1689.5205.3877.751.6396,1.6992-.3223,3.582-.6777,5.208-.2148,1.8135.5156,2.501,2.0176,3.835,3.1367,1.7324,1.4521,4.0635,1.291,6.1738,1.1621,2.3486-.1426,4.6943-.3447,7.0352-.5781,1.0645-.1055,2.2119-.0771,3.2812.0244.7725.0732,1.5615.3066,2.2129.3447,1.0635.0625,1.3848,1.3545.5273,1.9473Zm-29.7178-2.8096c-.0469-.0508-.0869-.1094-.1113-.1719l-.0293-.0117c.0186.1436.0928.1895.1406.1836Z"
            variants={TEXT_VARIANTS}
            custom={4}
          />
          <motion.path
            d="m351.2525,382.9385c-.293,1.332-1.8682,2.0273-3.0605,2.3271-1.791.4512-3.7061.6104-5.5322.8389-4.209.5254-8.4561.8799-12.6992.9424-2.4873.0361-4.9854.0059-7.4561-.3135-2.1387-.2764-4.5283-.8945-5.7354-2.8691-1.3682-2.2363-.3418-4.8428,1.5625-6.3721,1.6738-1.3447,4.6768-2.5723,6.7383-1.3672,2.6982,1.5781.9062,4.8428-1.1748,5.9785-.2207.1201-.4736.2314-.7461.3271.2783.0215.5312.0361.7246.0527,3.6553.3281,7.375.1914,11.0322-.0469,3.1211-.2041,6.2471-.4961,9.3418-.9502,1.2412-.1816,2.5078-.5322,3.7588-.6074.3584-.0205.7402-.0352,1.0986-.0332.293.002,1.334.0918.6074.0713,1.0752.0312,1.7666.9932,1.54,2.0215Z"
            variants={TEXT_VARIANTS}
            custom={5}
          />
          <motion.path
            d="m391.1382,382.8018c-3.1641.6816-6.29,1.4316-9.4629,2.0654-3.6934.7373-7.3916,1.458-11.1016,2.1074-5.6113.9824-11.793,2.2441-17.4707,1.0586-2.0898-.4365-4.1924-1.4707-5.332-3.3535-2.1465-3.5479-.2295-8.2969,1.3047-11.709,1.9395-4.3145,4.7588-8.1826,7.7109-11.8525,2.9531-3.6709,6.0703-7.2285,9.3213-10.6396,3.1895-3.3457,6.5439-6.542,10.1348-9.4561,1.793-1.4541,3.6348-2.8564,5.543-4.1572,1.9023-1.2969,3.9492-2.3818,6.3086-2.375,1.2129.0039,2.1055.9907,2.1582,2.1592.1074,2.3486-1.5137,4.0361-2.9893,5.6533-1.3711,1.502-2.8105,2.9404-4.2969,4.3281-2.9385,2.7451-6.082,5.2656-9.2451,7.7451-5.501,4.3135-11.123,8.5361-16.3828,13.1523-2.208,3.0811-4.2217,6.3965-5.3809,10.002-.3203.9971-.6514,2.0508-.7334,3.0986-.0332.4229,0,.8252.0693,1.2393.0146.0889.0508.1943.0762.2627.0703.1357.1465.2676.2217.4014.0078.0146.0127.0254.0186.0361.0137.0137.0303.0283.0488.0469.0762.0752.1523.1465.2285.2188.0586.0459.2568.21.3398.2549.1924.1045.3799.2109.5771.3066.0215.0107.0381.0195.0527.0264.0322.0088.0791.0225.1455.043.4209.1289.835.252,1.2656.3418.7314.1523.4854.1113,1.168.1729.5332.0479,1.0664.0732,1.6006.083,5.6133.1104,11.2402-1.0957,16.7256-2.1299,5.5615-1.0488,11.3408-2.3779,17.0244-1.7256,1.3691.1572,1.9229,2.2559.3516,2.5947Zm-20.8975-30.3564c2.8838-2.4014,5.748-4.8301,8.4717-7.4121.8408-.7969,1.668-1.6055,2.4805-2.4287-1.4912,1.1328-2.9385,2.3223-4.3496,3.5537-2.29,2-4.4834,4.1074-6.6025,6.2871Z"
            variants={TEXT_VARIANTS}
            custom={6}
          />
          <motion.path
            d="m566.189,330.2153c-4.9854,13.897-18.3525,21.1948-31.8838,24.7954-7.2275,1.9238-14.7227,3.2949-22.1973,3.6924-7.3848.3926-14.9941-.3145-21.8945-3.1094-3.0898-1.252-6.5928-2.8838-7.79-6.2646-1.1641-3.292,1.1133-6.5684,3.6768-8.4453,4.5176-3.3105,11.165-3.1338,15.3242.6699.7344.6719-.2451,1.9521-1.0674,1.3828-2.0742-1.4365-4.6396-1.9873-7.1367-1.6182-2.458.3633-4.8789,1.5752-6.3916,3.585-.8877,1.1787-1.4346,2.5908-.4609,3.8691.8291,1.0898,2.2012,1.7773,3.4131,2.3418,6.3721,2.9688,13.6484,3.7598,20.6016,3.5283,7.083-.2363,14.1289-1.5186,20.9912-3.2422,6.6055-1.6602,13.1182-3.9492,18.8174-7.75,9.8926-6.5986,17.1992-19.9204,10.8711-31.3809-6.7861-12.2896-21.9238-14.7949-34.709-13.9629-14.1885.9224-28.291,4.8374-41.0283,11.1279-6.0801,3.0034-12.1553,6.478-17.4004,10.8062-4.6562,3.8413-8.9629,8.6372-10.2939,14.6904-1.4434,6.5601,1.4707,13.0239,5.1914,18.2788,4.0781,5.7598,9.4551,10.6055,14.7236,15.2471,5.4199,4.7754,11.0107,9.3721,16.0928,14.5156,1.9961,2.0195,4.0742,4.2324,5.6367,6.6621,2.3711-.7803,4.7461-1.5449,7.126-2.2949,3.6797-1.1592,7.3682-2.2861,11.0625-3.3965,1.8096-.5439,3.6182-1.0928,5.4326-1.6221,1.8809-.5479,3.8291-.8633,5.7051-1.418,2.4072-.7109,3.4248,3.04,1.0332,3.7461-2.0889.6172-4.1045,1.4824-6.1953,2.1035-1.9512.5801-3.9014,1.1621-5.8506,1.75-4.042,1.2188-8.0771,2.459-12.0996,3.7412-1.4248.4541-2.8496.915-4.2725,1.3809.7129,2.207.8584,4.5713.0879,7.1084-1.9326,6.3711-7.873,10.5527-13.1621,14.0312-6.002,3.9482-12.3203,7.415-18.8701,10.3672-6.5938,2.9707-13.4014,5.459-20.375,7.3789-3.4434.9482-6.9297,1.7861-10.4434,2.4336-3.2822.6055-6.8271.9043-9.7559-1.0156-.5986-.3916-1.1797-1.126-1.0889-1.8984.9697-8.2881,8.5801-13.0195,15.0322-17.1055,13.0566-8.2686,27.2119-14.6602,41.666-20.0586,3.5664-1.332,7.1562-2.6025,10.7617-3.8271-1.9053-2.6963-4.6133-5.0879-6.6953-7.0879-5.4746-5.2578-11.3975-10.0186-17-15.1357-5.4648-4.9912-10.8926-10.3945-14.5713-16.8818-3.4902-6.1582-5.1357-13.416-2.8135-20.2856,2.1631-6.4019,6.9385-11.5098,12.1816-15.5884,11.6865-9.0918,25.8906-15.4038,40.207-18.9814,7.3174-1.8286,14.8867-3.0059,22.4307-3.2617,7.6719-.2612,15.5322.6592,22.5293,3.9805,5.7754,2.7412,10.9912,7.3145,13.877,13.0791,3.0234,6.0415,3.2471,13.0039.9746,19.3394Zm-69.124,64.7876c-11.248,3.793-22.3545,8.0264-33.0576,13.1689-6.6357,3.1895-13.1123,6.7188-19.3291,10.666-2.8613,1.8174-5.7881,3.6426-8.2852,5.9521-1.7637,1.6318-3.4521,3.624-4.127,5.9727,2.4316.7578,5.3311-.0957,7.7158-.6025,14.7285-3.1328,28.877-8.7363,41.752-16.543,3.0117-1.8262,6.0713-3.7061,8.8301-5.9033,2.4395-1.9434,4.9053-4.2734,6.1602-7.1904.8262-1.9209.8408-3.7666.3408-5.5205Z"
            variants={TEXT_VARIANTS}
            custom={7}
          />
          <motion.path
            d="m583.0474,383.5723c-3.2305,2.2324-7.2793,2.2461-11.0684,2.5264-4.0127.2959-8.2324.5547-11.4062-2.4424-.9346-.8828-1.2441-2.0029-2.668-1.9111-1.4014.0898-2.8125.376-4.1865.6543-3.0264.6123-5.9033,1.75-8.9121,2.3955-1.4111.3027-3.1797.6279-4.5996.1982-1.627-.4902-2.4326-2.3115-1.6406-3.8281.6533-1.252,2.0312-1.957,3.2393-2.5791,1.2852-.6631,2.6436-1.2275,4.0352-1.623,2.5156-.7158,5.8223-1.377,8.1826.1475.2607.1689.5205.3877.751.6396,1.6992-.3223,3.582-.6777,5.208-.2148,1.8135.5156,2.501,2.0176,3.835,3.1367,1.7324,1.4521,4.0635,1.291,6.1738,1.1621,2.3486-.1426,4.6943-.3447,7.0352-.5781,1.0645-.1055,2.2119-.0771,3.2812.0244.7725.0732,1.5615.3066,2.2129.3447,1.0635.0625,1.3848,1.3545.5273,1.9473Zm-29.7178-2.8096c-.0469-.0508-.0869-.1094-.1113-.1719l-.0293-.0117c.0186.1436.0928.1895.1406.1836Z"
            variants={TEXT_VARIANTS}
            custom={8}
          />
          <motion.path
            d="m636.6118,384.9648c-1.5635.9688-3.582,1.0635-5.3779,1.2012-1.9521.1514-3.9072.2676-5.8623.3613-3.5068.1689-7.0205.2773-10.5312.2529-1.5566-.0107-3.1328-.0127-4.6797-.1963-2.2988-.2734-4.0547-1.082-5.5918-2.8301-.6729-.7646-1.166-.9785-2.1797-.9951-1.1182-.0195-2.2451.0654-3.3574.1807-2.2646.2354-4.5049.7266-6.7041,1.3066-2.3271.6143-4.6191,1.3535-6.8975,2.127-2.2021.7471-4.3867,1.4775-6.7227,1.6475-1.1201.082-2.2158-1.0518-2.1572-2.1562.1162-2.1885,1.7842-3.8662,3.2412-5.3682,1.2451-1.2832,2.6318-2.4268,3.9189-3.668,1.4912-1.4365,3.4336.0703,3.1836,1.8535-.1035.7354-.6855,1.5537-1.0361,2.1963-.1465.2676-.3047.6025-.4863.9424.2227-.0762.4463-.1523.6699-.2256,2.5781-.8486,5.1846-1.626,7.8408-2.1953,2.2988-.4922,4.6475-.8418,6.9961-.9648,2.1846-.1152,4.4004.0049,6.1123,1.5303.7041.627,1.1875,1.5869,2.0908,1.957.7559.3086,1.6162.3535,2.4199.3955,1.4736.0781,2.9512.0879,4.4268.083,3.5674-.0107,7.1357-.1377,10.6973-.332,1.6963-.0928,3.3926-.2031,5.085-.3418,1.4795-.1201,3.0781-.2666,4.5039.1924,1.3672.4395,1.6436,2.2734.3975,3.0459Z"
            variants={TEXT_VARIANTS}
            custom={9}
          />
          <motion.path
            d="m673.0298,384.6709c-1.6162,1.6934-4.1777,2.1045-6.3877,2.5332-2.167.4199-4.377.6514-6.583.501-4.3994-.3008-8.5938-1.9932-13.0029-2.1309-2.2158-.0684-4.4111.2344-6.5977.5547-2.1426.3145-4.4336.8135-6.6064.6719-2.332-.1523-4.0068-2.0283-3.1484-4.3691.5947-1.623,1.8691-3.0293,3.2549-4.0244,1.374-.9863,3.0645-1.6367,4.752-1.7705,1.2041-.0947,3.5918.0762,3.8721,1.5986.3037,1.6494-3.167,1.8018-4.1787,2.2051-.8154.3252-1.5703.7998-2.2129,1.3965-.1885.1748-.3711.3545-.542.5439.0215-.001.043-.002.0635-.0039.8906-.0762,1.7773-.1885,2.6621-.3164,1.7324-.249,3.4609-.5312,5.2021-.708,3.502-.3555,6.8721.1045,10.2939.8486,3.1836.6934,6.2686,1.3721,9.5479,1.0703,2.8906-.2656,6.1016-1.9492,8.9639-1.0537,1.0625.333,1.4248,1.6377.6475,2.4531Zm-38.8906-2.1865.6611,1.1455"
            variants={TEXT_VARIANTS}
            custom={10}
          />
          <motion.path
            d="m674.812,379.1289c-.7764.9043-1.498,1.7666-2.1807,2.6865.7881-.3584,1.5967-.6777,2.4004-.9785,2.4424-.9141,4.9805-1.5742,7.542-2.0547,2.1553-.4053,4.5059-.9131,6.708-.8193,1.0547.0439,2.1123.2832,2.9951.8818,1.0195.6904,1.2812,1.7139,1.999,2.6182.7529.9492,2.5576.7422,3.6504.7412,1.29-.002,2.5801-.0615,3.8672-.1309,3.0293-.1621,6.0566-.4014,9.0752-.7051,1.1406-.1152,2.3271-.3369,3.4766-.2803.4199.0215.7129.1523,1.1055.3115.0039.001.0107.0039.0156.0059.0762.0205.207.0586.2422.0684.3457.0996.7041.2129.9639.4746-.0254-.0029-.0498-.0068-.0742-.0098.6191.5371.8057,1.5439-.0234,2.0352-.0615.0654-.127.1309-.1982.1943-.0869.0781-.8047.6436-.376.2959-.3496.2842-.6631.5596-1.1025.7051-1.3545.4463-2.8809.4873-4.292.625-3.0225.2959-6.0537.5312-9.0879.6846-2.8564.1436-6.3672.5605-8.9561-.8711-.9668-.5342-1.6689-1.3447-2.1934-2.3027-.3965-.7236-.4043-1.0322-1.2637-1.0879-2.1113-.1367-4.4385.3584-6.5068.7393-2.21.4072-4.3906.9609-6.5166,1.6885-2.1641.7402-4.2227,1.7822-6.415,2.3877-.2949.082-.5693.0605-.8115-.0264-.3184.0547-.6396.0488-.9248-.0303-1.2471-.3428-1.708-1.5322-1.5371-2.708.2041-1.4111,1.1006-2.7695,1.8965-3.9199,1.1602-1.6777,2.4727-3.2568,3.8105-4.7939,2.5469-2.9248,5.252-5.708,7.9434-8.499,3.2285-3.3477,6.3643-6.7832,9.585-10.1396,4.1689-4.3447,8.3984-8.6309,12.6416-12.9033,4.0781-4.1074,8.042-8.4189,12.793-11.7686.9072-.6396,2.1973-.2275,2.8291.5649.7354.9229.5029,2.019-.1719,2.8794-2.5732,3.2812-5.0947,6.6016-7.6348,9.9082-4.8887,6.3643-9.833,12.7061-15.3193,18.5723-5.0293,5.3779-10.6318,10.6934-17.2266,14.1064-.0029-.0078-.0068-.0156-.0098-.0234-.1211.0752-.249.1416-.3916.1924-.6211.2236-1.1367.0703-1.4971-.2686-.2783.3164-.5557.6338-.8291.9541Zm.75-3.5654,9.2666-7.1475c.1377-.125.2773-.248.4141-.375,3.5693-3.3096,6.8682-6.8584,10.0107-10.5459-3.4814,3.6338-6.9414,7.2871-10.4248,10.9209Z"
            variants={TEXT_VARIANTS}
            custom={11}
          />
          <motion.path
            d="m746.5767,382.9385c-.293,1.332-1.8682,2.0273-3.0605,2.3271-1.791.4512-3.7061.6104-5.5322.8389-4.209.5254-8.4561.8799-12.6992.9424-2.4873.0361-4.9854.0059-7.4561-.3135-2.1387-.2764-4.5283-.8945-5.7354-2.8691-1.3682-2.2363-.3418-4.8428,1.5625-6.3721,1.6738-1.3447,4.6768-2.5723,6.7383-1.3672,2.6982,1.5781.9062,4.8428-1.1748,5.9785-.2207.1201-.4736.2314-.7461.3271.2783.0215.5312.0361.7246.0527,3.6553.3281,7.375.1914,11.0322-.0469,3.1211-.2041,6.2471-.4961,9.3418-.9502,1.2412-.1816,2.5078-.5322,3.7588-.6074.3584-.0205.7402-.0352,1.0986-.0332.293.002,1.334.0918.6074.0713,1.0752.0312,1.7666.9932,1.54,2.0215Z"
            variants={TEXT_VARIANTS}
            custom={12}
          />
          <motion.path
            d="m781.8794,384.0156c-3.3594,2.4199-7.0615,4.4219-10.9824,5.7891-1.8262.6367-4.1387,1.4082-6.0752.9111-1.0254-.2627-1.876-.9199-2.377-1.7705-4.3301.7119-8.6865,1.2783-13.0605,1.625-1.6973.1348-2.2129-2.0176-1.2842-3.1006,1.0625-1.2373,2.1309-2.4707,3.1973-3.7041.374-.4326.7432-1.0605,1.1484-1.4932-.1953-.0225-.377-.042-.415-.0439-1.4287-.0752-2.8604-.0264-4.2832.1172-1.2266.124-2.6377.627-3.8691.4746-.5596.0996-.9961-.7148-.5674-1.1875.6914-.7627,1.8545-.9863,2.8105-1.2959,1.0039-.3252,2.0303-.5439,3.0732-.7012,1.6602-.251,4.0908-.833,5.5879.1855,1.6045,1.0928,1.3242,3.1914.3633,4.6201-.458.6816-.96,1.3438-1.4824,1.9951,3.2627-.4131,6.5137-.8975,9.751-1.4893,1.3154-.2402,2.5928.7324,2.3838,2.0996.0361-.373-.3184.1113,0,0-.0117.0781-.0264.1562-.0479.2363.0273-.1025.042-.1787.0479-.2363.0127-.0039.0234-.0068.0391-.0137.1777-.0771.8408-.0596,1.0303-.0938.6289-.1143,1.252-.2881,1.8623-.4756,1.3535-.415,2.6709-.9463,3.9609-1.5273,2.6914-1.2129,5.3535-2.5078,8.2441-3.1602,1.4131-.3193,2.0469,1.4434.9443,2.2393Z"
            variants={TEXT_VARIANTS}
            custom={13}
          />
          <motion.path
            d="m552.0347,426.9111c0,3.4854-2.5264,5.5898-6.6904,5.5898h-4.3975v5.1699h-1.7314v-16.374h6.1289c4.1641,0,6.6904,2.1055,6.6904,5.6143Zm-1.7314,0c0-2.6201-1.7305-4.1172-5.0059-4.1172h-4.3506v8.1865h4.3506c3.2754,0,5.0059-1.4971,5.0059-4.0693Z"
            variants={TEXT_VARIANTS}
            custom={14}
          />
          <motion.path
            d="m574.1431,421.2969v16.374h-1.708v-7.5557h-10.2451v7.5557h-1.7314v-16.374h1.7314v7.2979h10.2451v-7.2979h1.708Z"
            variants={TEXT_VARIANTS}
            custom={15}
          />
          <motion.path
            d="m582.7075,429.4834c0-4.7715,3.6494-8.3271,8.6084-8.3271,4.9121,0,8.585,3.5322,8.585,8.3271s-3.6729,8.3281-8.585,8.3281c-4.959,0-8.6084-3.5557-8.6084-8.3281Zm15.4619,0c0-3.9062-2.9238-6.7832-6.8535-6.7832-3.9541,0-6.9014,2.877-6.9014,6.7832s2.9473,6.7842,6.9014,6.7842c3.9297,0,6.8535-2.877,6.8535-6.7842Z"
            variants={TEXT_VARIANTS}
            custom={16}
          />
          <motion.path
            d="m611.4126,422.7939h-5.7539v-1.4971h13.2402v1.4971h-5.7549v14.877h-1.7314v-14.877Z"
            variants={TEXT_VARIANTS}
            custom={17}
          />
          <motion.path
            d="m624.6548,429.4834c0-4.7715,3.6494-8.3271,8.6084-8.3271,4.9121,0,8.585,3.5322,8.585,8.3271s-3.6729,8.3281-8.585,8.3281c-4.959,0-8.6084-3.5557-8.6084-8.3281Zm15.4619,0c0-3.9062-2.9238-6.7832-6.8535-6.7832-3.9541,0-6.9014,2.877-6.9014,6.7832s2.9473,6.7842,6.9014,6.7842c3.9297,0,6.8535-2.877,6.8535-6.7842Z"
            variants={TEXT_VARIANTS}
            custom={18}
          />
          <motion.path
            d="m661.9448,429.4834h1.6611v6.2461c-1.5439,1.3799-3.7432,2.082-6.0117,2.082-4.9824,0-8.6318-3.5322-8.6318-8.3281s3.6494-8.3271,8.6553-8.3271c2.4795,0,4.6309.7949,6.082,2.3623l-1.0762,1.0996c-1.3809-1.3564-3.0176-1.918-4.9355-1.918-4.0469,0-7.0176,2.877-7.0176,6.7832,0,3.8838,2.9707,6.7842,6.9941,6.7842,1.5664,0,3.0176-.3506,4.2803-1.2637v-5.5205Z"
            variants={TEXT_VARIANTS}
            custom={19}
          />
          <motion.path
            d="m684.3579,437.6709l-3.7432-5.2627c-.4209.0459-.8418.0693-1.3096.0693h-4.3984v5.1934h-1.7305v-16.374h6.1289c4.1641,0,6.6895,2.1055,6.6895,5.6143,0,2.5723-1.3564,4.374-3.7422,5.1455l4,5.6143h-1.8945Zm-.0938-10.7598c0-2.6201-1.7305-4.1172-5.0059-4.1172h-4.3516v8.21h4.3516c3.2754,0,5.0059-1.5205,5.0059-4.0928Z"
            variants={TEXT_VARIANTS}
            custom={20}
          />
          <motion.path
            d="m705.0386,433.2969h-9.1221l-1.9648,4.374h-1.8018l7.4854-16.374h1.707l7.4863,16.374h-1.8252l-1.9648-4.374Zm-.6318-1.4033l-3.9297-8.7959-3.9297,8.7959h7.8594Z"
            variants={TEXT_VARIANTS}
            custom={21}
          />
          <motion.path
            d="m729.0415,426.9111c0,3.4854-2.5254,5.5898-6.6895,5.5898h-4.3984v5.1699h-1.7305v-16.374h6.1289c4.1641,0,6.6895,2.1055,6.6895,5.6143Zm-1.7305,0c0-2.6201-1.7305-4.1172-5.0059-4.1172h-4.3516v8.1865h4.3516c3.2754,0,5.0059-1.4971,5.0059-4.0693Z"
            variants={TEXT_VARIANTS}
            custom={22}
          />
          <motion.path
            d="m751.1499,421.2969v16.374h-1.708v-7.5557h-10.2451v7.5557h-1.7314v-16.374h1.7314v7.2979h10.2451v-7.2979h1.708Z"
            variants={TEXT_VARIANTS}
            custom={23}
          />
          <motion.path
            d="m766.7798,432.0098v5.6611h-1.708v-5.6611l-6.5498-10.7129h1.8477l5.6143,9.1924,5.6143-9.1924h1.7305l-6.5488,10.7129Z"
            variants={TEXT_VARIANTS}
            custom={24}
          />
          {/* Objective */}
          <g fill="none" opacity=".1">
            <motion.circle
              cx="392.8897"
              cy="370.3215"
              r="157.5251"
              fill="transparent"
              stroke={"#fff"}
              strokeWidth={20}
              initial={{
                pathLength: 0
              }}
              animate={{
                pathLength: 1
              }}
              transition={{
                duration: 2,
                delay: 1
              }}
            />
          </g>
          {/* Flash */}
          <g fill="none" opacity="1">
            <motion.circle
              cx="520.5993"
              cy="113.4116"
              r="14.9078"
              transform="translate(72.2859 401.3368) rotate(-45)"
              fill="#fff"
              initial={{
                opacity: 0,
                scale: 0
              }}
              animate={{
                opacity: [1, 0.1],
                scale: 1
              }}
              transition={{
                scale: {
                  delay: 3.5,
                  type: "spring",
                  damping: 6,
                  stiffness: 50,
                  duration: 2,
                },
                opacity: {
                  delay: 3.5,
                  duration: 0.8
                }
              }}
            />
          </g>
          {/* Line box */}
          <motion.path
            d="m101.1631,482.9482l94.1088,268.2496c3.6342,10.3588,14.9777,15.8103,25.3364,12.1761l535.4025-187.8328c10.3588-3.6342,15.8102-14.9776,12.1761-25.3364l-23.5953-67.2565"
            fill="none"
            stroke="#fff"
            strokeMiterlimit="10"
            strokeWidth="3"
            initial={{
              pathLength: 0
            }}
            animate={{
              pathLength: 1
            }}
            transition={{
              duration: 1,
              delay: 2
            }}
          />
          <motion.path
            d="m674.3935,282.8543L580.354,14.8022c-3.6342-10.3587-14.9775-15.8102-25.3364-12.176l-87.1127,30.5614"
            fill="none"
            stroke="#fff"
            strokeMiterlimit="10"
            strokeWidth="3"
            initial={{
              pathLength: 0
            }}
            animate={{
              pathLength: 1
            }}
            transition={{
              duration: 0.5,
              delay: 2
            }}
          />
          <motion.path
            d="m431.3569,46.0095L19.6151,190.459c-10.3588,3.634-15.8101,14.9775-12.1761,25.3363l23.5256,67.0579"
            fill="none"
            stroke="#fff"
            strokeMiterlimit="10"
            strokeWidth="3"
            initial={{
              pathLength: 0
            }}
            animate={{
              pathLength: 1
            }}
            transition={{
              duration: 0.5,
              delay: 2.5,
            }}
          />
        </motion.svg>
      </motion.h1>
    </Link>
  );
}
