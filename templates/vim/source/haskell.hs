import System
import Foreign
import qualified Data.ByteString as B

main = do
    w <- getArgs >>= readIO . head
    let n      = w `div` 8
        loop_y = B.unfoldrN n (next_x w (2/fromIntegral w) n)

        unfold x = case loop_y x of
                    (s, Nothing) -> B.putStr s
                    (s, Just x)  -> B.putStr s >> unfold x

    putStrLn ("P4\n"++show w++" "++show w)
    unfold (T 1 0 0 (-1))

data T = T !Int !Int !Int !Double

next_x !w !iw !bw (T bx x y ci)
    | y  == w   = Nothing
    | bx == bw  = Just (loop_x w x 8 iw ci 0, T 1 0    (y+1)   (iw+ci))
    | otherwise = Just (loop_x w x 8 iw ci 0, T (bx+1) (x+8) y ci)

loop_x !w !x !n !iw !ci !b
    | x < w = if n == 0
                    then b
                    else loop_x w (x+1) (n-1) iw ci (b+b+v)
    | otherwise = b `shiftL` n
  where
    v = fractal 0 0 (fromIntegral x * iw - 1.5) ci 50
