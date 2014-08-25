integer :: my_seed
        becomes
  integer, optional :: my_seed
module ran_mod
! ran1 returns a uniform random number between 0-1 
! the seed is optional and used to reset the generator 
contains
   function ran1(my_seed)
      use numz
      implicit none
      real(b8) ran1,r
      integer, optional ,intent(in) :: my_seed  ! optional argument not changed in the routine 
      integer,allocatable :: seed(:)
      integer the_size,j
      if(present(my_seed))then            ! use the seed if present 
          call random_seed(size=the_size) ! how big is the intrisic seed? 
          allocate(seed(the_size))        ! allocate space for seed 
          do j=1,the_size                 ! create the seed 
             seed(j)=abs(my_seed)+(j-1)   ! abs is generic 
          enddo
          call random_seed(put=seed)      ! assign the seed 
          deallocate(seed)                ! deallocate space 
      endif
      call random_number(r)
      ran1=r
  end function ran1
end module

program darwin
    use numz
