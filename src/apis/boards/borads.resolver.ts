// boards.resolver.ts
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { Board } from './entities/board.entity';
import { UpdateBoardInput } from './dto/update-board.input';

@Resolver()
export class BoardsResolver {
    constructor(private readonly boardsService: BoardsService) {}

    @Query(() => [Board], { nullable: true })
    fetchBoards():  Promise<Board[]> {
        return this.boardsService.findAll();
    }

    @Query(() => Board, { nullable: true })
    fetchBoard( @Args('boardId') boardId: string):  Promise<Board> {
        return this.boardsService.findOne({boardId});
    }

    @Mutation(() => Board)
    createBoard(
        @Args('createBoardInput') createBoardInput: CreateBoardInput,
    ):  Promise<Board> {
        return this.boardsService.create({ createBoardInput });
    }

    @Mutation(() => Board)
    async updateProduct(
        @Args('boardId') boardId: string,
        @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
    ): Promise<Board> {
        return this.boardsService.update({ boardId, updateBoardInput });
    }


    @Mutation(() => Boolean)
    deleteProduct(
        @Args('boardId') boardId: string, //
    ): Promise<boolean> {
        return this.boardsService.delete({ boardId });
    }
    
}