import React from 'react';

const Placeholder = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { isOver?: boolean } // نضيف isOver للتمييز
>(({ isOver, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      style={{
        border: `2px dashed ${isOver ? 'blue' : '#ccc'}`, // تمييز عند المرور فوقه مباشرة
        borderRadius: '8px',
        backgroundColor: 'rgba(240, 240, 240, 0.5)',
        minHeight: '120px', // ارتفاع مماثل للويدجت
        minWidth: '180px', // عرض مماثل للويدجت
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#aaa',
        transition: 'border-color 0.2s ease-in-out', // انتقال سلس للون الحدود
        ...props.style,
      }}
    >
      {/* يمكن وضع أيقونة + هنا */}qw
    </div>
  );
});
Placeholder.displayName = 'Placeholder';
export default Placeholder;