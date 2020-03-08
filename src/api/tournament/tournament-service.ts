import { PrismaClient } from "@prisma/client"
import { inject, injectable } from "inversify"
import {
  TTournament,
  TTournamentList,
  TTournamentUpdateProps,
} from "../../common/types/tournament-types"
import { PrismaService } from "../server/prisma-service"

@injectable()
export class TournamentService {
  prisma: PrismaClient
  constructor(@inject(PrismaService) private readonly prismaService: PrismaService) {
    this.prisma = this.prismaService.prisma
  }
  list = async (): Promise<TTournamentList[]> => {
    const tournaments = await this.prisma.tournament.findMany({
      select: { id: true, name: true, logo: true },
      orderBy: { created_at: "asc" },
    })
    return tournaments
  }
  getTournament = async (id: string): Promise<TTournament> => {
    const tournament = await this.prisma.tournament.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        logo: true,
        videos: { select: { id: true, url: true } },
        images: { select: { id: true, url: true } },
      },
    })
    if (!tournament) {
      throw new Error("Unknown tournament")
    }
    return tournament
  }
  create = async (data: TTournamentUpdateProps): Promise<string> => {
    const tournament = await this.prisma.tournament.create({ data })
    return tournament.id
  }
  update = async (id: string, data: TTournamentUpdateProps): Promise<TTournament> => {
    const tournament = await this.prisma.tournament.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        description: true,
        logo: true,
        videos: { select: { id: true, url: true } },
        images: { select: { id: true, url: true } },
      },
    })
    return tournament
  }
  deleteTournament = async (id: string): Promise<TTournamentList[]> => {
    await this.prisma.tournamentImage.deleteMany({ where: { tournament: { id } } })
    await this.prisma.tournamentVideo.deleteMany({ where: { tournament: { id } } })
    await this.prisma.tournament.delete({ where: { id } })
    const tournaments = await this.prisma.tournament.findMany({
      select: { id: true, name: true, logo: true },
      orderBy: { created_at: "asc" },
    })
    return tournaments
  }
}
