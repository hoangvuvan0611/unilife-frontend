import Image from "next/image";

type UserAvatarProps = {
    name: string;
    imageUrl?: string;
    width?: number;
    height?: number;
    color?: string;
};
  
export const UserAvatar = ({ name, imageUrl, width, height, color}: UserAvatarProps) => {
    const getInitials = (name: string) =>
        name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 1); // Tối đa 2 chữ cái

    return imageUrl ? (
        <Image
            src={imageUrl}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
            width={width}
            height={height}
        />
    ) : (
        <div className={`rounded-full bg-${color}-500 text-white flex items-center text-center justify-center font-bold`} style={{ width: width, height: height }}>
            {getInitials(name)}
        </div>
    );
};
  