'use client';

import Container from '../Container';
import {
   TbDiamond,
   TbDiamondFilled,
   TbDiamonds,
   TbMountain,
   TbPool,
   TbWindmill,
} from 'react-icons/tb';
import {
   GiBarn,
   GiBoatFishing,
   GiCastle,
   GiCaveEntrance,
   GiCutDiamond,
   GiDesert,
   GiForestCamp,
   GiIsland,
   GiModernCity,
   GiSnowman,
} from 'react-icons/gi';
import { MdBeachAccess, MdDownhillSkiing } from 'react-icons/md';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
   {
      label: 'Beach',
      // icon: TbBeach as unknown as IconType,
      icon: MdBeachAccess,
      description: 'This property is close to the beach!',
   },
   {
      label: 'Windmills',
      // icon: GiWindmill as unknown as IconType,
      icon: TbWindmill,
      description: 'This property has windmills!',
   },
   {
      label: 'Modern',
      // icon: MdOutlineVilla as unknown as IconType,
      icon: GiModernCity,
      description: 'This property is modern!',
   },
   {
      label: 'Countryside',
      icon: TbMountain,
      description: 'This property is in the countryside!',
   },
   {
      label: 'Pools',
      icon: TbPool,
      description: 'This property has a pool!',
   },
   {
      label: 'Islands',
      icon: GiIsland,
      description: 'This property is on an island!',
   },
   {
      label: 'Lake',
      icon: GiBoatFishing,
      description: 'This property is close to a lake!',
   },
   {
      label: 'Skiing',
      icon: MdDownhillSkiing,
      description: 'This property has skiing activities!',
   },
   {
      label: 'Castles',
      icon: GiCastle,
      description: 'This property is in a castle!',
   },
   {
      label: 'Camping',
      icon: GiForestCamp,
      description: 'This property has camping activities!',
   },
   {
      label: 'Arctic',
      icon: GiSnowman,
      description: 'This property has cold weather!',
   },
   {
      label: 'Cave',
      icon: GiCaveEntrance,
      description: 'This property is in a cave!',
   },
   {
      label: 'Desert',
      icon: GiDesert,
      description: 'This property is in the desert!',
   },
   {
      label: 'Barns',
      icon: GiBarn,
      description: 'This property is in the barn!',
   },
   {
      label: 'Lux',
      icon: GiCutDiamond,
      description: 'This property luxurious!',
   },
];

const Categories = () => {
   const params = useSearchParams();
   const category = params?.get('category');
   const pathname = usePathname();
   const isMainPage = pathname === '/';

   if (!isMainPage) {
      return null;
   }

   return (
      <Container>
         <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto no-scrollbar '>
            {categories.map((item) => (
               <CategoryBox
                  key={item.label}
                  label={item.label}
                  selected={category === item.label}
                  icon={item.icon}
               />
            ))}
         </div>
      </Container>
   );
};

export default Categories;
