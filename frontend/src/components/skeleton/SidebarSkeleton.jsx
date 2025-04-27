import React from "react";
import { Users } from "lucide-react";

const SkeletonContact = () => (
  <div className="w-full p-4 flex items-center gap-4" aria-hidden="true">
    <div className="relative mx-auto lg:mx-0">
      <div className="skeleton size-12 rounded-full" />
    </div>
    <div className="hidden lg:block text-left min-w-0 flex-1">
      <div className="skeleton h-4 w-32 mb-2"></div>
      <div className="skeleton h-3 w-16"></div>
    </div>
  </div>
);
const SidebarSkeleton = () => {
  const skeletonContacts = Array.from({ length: 9 });
  return (
    <aside className="flex flex-col h-full lg:w-72 border-r border-base-300 transition-all duration-200">
      {/* header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-3.5">
          <Users className="w-6 h-6 " />
          <span className="font-medium hidden lg:block">Friends</span>
        </div>
      </div>

      {/* items */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, i) => (
          <SkeletonContact key={i} />
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
